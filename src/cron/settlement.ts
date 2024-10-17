import { Tools } from "../utils";
import { OrderRepo, SettlementRepo, VendorRepo, WalletRepo } from "../repositories";
import { Logger } from "../libs";

async function settlement(){
    let itemId;
    const orderQuery = {
       where: { status: 'delivered' } 
    }
    let arrOfUsers = []
    let commissionDeducted;
    let selectedOrder: any;
    const deliveredOrders: any = await OrderRepo.findProducts(orderQuery)
    for(const order of deliveredOrders?.rows){
        if(Tools.compareDates(new Date(order?.dateDelivered), new Date())){
            const singleOrder: any = await OrderRepo.findOne(order?.id)
            if(!singleOrder?.isReturned && !singleOrder?.isMovedToSettlement) {
                {/** Update order status to completed order */}
                await OrderRepo.updateProduct(order?.id, { status: 'completed'})
                {/** get the order details */}
                selectedOrder = await OrderRepo.findOne(order?.id)
                const vendor: any = await VendorRepo.findOne(singleOrder?.vendorId)
                commissionDeducted = parseFloat(singleOrder?.product?.commission)/100 * singleOrder?.subTotal
                const settlementAmount = singleOrder?.subTotal - commissionDeducted
                if(vendor){
                    itemId = singleOrder?.id
                    const userData = {
                        vendorId: vendor?.id,
                        name: `${vendor?.firstName} ${vendor?.lastName}`,
                        businessName: vendor?.businessName,
                        email: vendor?.email,
                        productName: singleOrder?.product?.name,
                        productImg: singleOrder?.product?.additionalImg,
                        productId: singleOrder?.productId,
                        amount: settlementAmount,
                        quantity: singleOrder?.quantity,
                        price: singleOrder?.price,
                        accountNo: vendor?.accountNumber,
                        accountName: vendor?.accountName,
                        bankName: vendor?.bankName
                    }
                        arrOfUsers.push(userData)
                }
            }
        }
    }
    if(arrOfUsers.length > 0) {
        const settlement: any = await SettlementRepo.addToSettlement(arrOfUsers)
        if(settlement?.length > 0){
            await OrderRepo.updateProduct(itemId, { isMovedToSettlement : true })
            for(const item of settlement){
                const vendorWallet: any = await WalletRepo.findVendorWallet(item?.vendorId)
                await WalletRepo.updateVendorWallet(vendorWallet?.id, { 
                    totalSales: vendorWallet?.totalSales + parseFloat(item?.amount),
                    withdrawableBalance: vendorWallet?.withdrawableBalance + parseInt(item?.amount)
                })
            }
            const businessWallet: any = await WalletRepo.findBusinessWallet("business")
            await WalletRepo.updateBusinessWallet(businessWallet?.id, {
                totalIncome: businessWallet?.totalIncome + (parseFloat(selectedOrder?.totalAmount) + parseFloat(selectedOrder?.shippingFee)),
                totalCommission: businessWallet?.totalCommission + commissionDeducted
            })
        }
        Logger.info(`Successfully moved ${arrOfUsers.length} vendor(s) to settlement on ${new Date()}`)
    } else {
        Logger.info(`No new vendor is due for settlement as at ${new Date()}`)
    }
}

export default settlement;