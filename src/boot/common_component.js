import { Notify, Dialog } from 'quasar'
// 코드미러
import ONECodeMirror from '../../components/codemirror/ONECodeMirror.vue'
// 그리드
import ONEGrid from '../../components/grid/ONEGrid.vue'
import ONEDynamicGrid from '../../components/grid/ONEDynamicGrid.vue'
import ONEPivot from '../../components/grid/ONEPivot.vue'
import ONEGridHeaderContent from '../../components/grid/ONEGridHeaderContent.vue'
import ONEGridPaging from '../../components/grid/ONEGridPaging.vue'
// input 관련
import ONEBreak from '../../components/input/ONEBreak.vue'
import ONEText from '../../components/input/ONEText.vue'
import ONENumber from '../../components/input/ONENumber.vue'
import ONESelect from '../../components/input/ONESelect.vue'
import ONECheckBox from '../../components/input/ONECheckBox.vue'
import ONECombo from '../../components/input/ONECombo.vue'
import ONEDate from '../../components/input/ONEDate.vue'
import ONEMonth from '../../components/input/ONEMonth.vue'
import ONEDateFromTo from '../../components/input/ONEDateFromTo.vue'
import ONEMonthFromTo from '../../components/input/ONEMonthFromTo.vue'
import ONEErrorBox from '../../components/input/ONEErrorBox.vue'
import ONEEditor from '../../components/input/ONEEditor.vue'
import ONEYear from '../../components/input/ONEYear.vue'
import ONETime from '../../components/input/ONETime.vue'
import ONESearchInput from '../../components/input/ONESearchInput.vue'
import ONEPopText from '../../components/input/ONEPopText.vue'
import ONEField from '../../components/input/ONEField.vue'
import ONERadio from '../../components/input/ONERadio.vue'
import ONECkEditor from '../../components/input/ONECkEditor.vue'
// button 관련
import ONEButton from '../../components/button/ONEButton.vue'
import ONEButtonGroup from '../../components/button/ONEButtonGroup.vue'
import ONEMainButtonGroup from '../../components/button/ONEMainButtonGroup.vue'
import ONEAddButtonGroup from '../../components/button/ONEAddButtonGroup.vue'
// layout 관련
import ONEPage from '../../components/layout/ONEPage.vue'
import ONESplitter from '../../components/layout/ONESplitter.vue'
import ONESearchCard from '../../components/layout/ONESearchCard.vue'
import MenuTitle from '../../components/MenuTitle.vue'
import ONESearchCondition from '../../components/layout/ONESearchCondition.vue'
import ONEMainCard from '../../components/layout/ONEMainCard.vue'
import ONETab from '../../components/layout/ONETab.vue'
import ONETabPanels from '../../components/layout/ONETabPanels.vue'
import ONEToolBar from '../../components/layout/ONEToolBar.vue'
// 카드
import ONECard from '../../components/card/ONECard.vue'
import ONECardTitle from '../../components/card/ONECardTitle.vue'
import ONEPopupTitle from '../../components/card/ONEPopupTitle.vue'
import ONECardSection from '../../components/card/ONECardSection.vue'
import ONECardForm from '../../components/card/ONECardForm.vue'
import ONEFlexCard from '../../components/card/ONEFlexCard.vue'
// Dialog
import ONEConfirm from '../../components/dialog/ONEConfirm.vue'
import ONEAlert from '../../components/dialog/ONEAlert.vue'
import ONEDialog from '../../components/dialog/ONEDialog.vue'
// 기타
import bigExcelFrame from '../../components/etc/BIGExcel.vue'
import ONELine from '../../components/seperator/ONELine.vue'
import ONEJsonTree from '../../components/etc/ONEJsonTree.vue'
import ONETile from '../../components/etc/ONETile.vue'
import ONESimpleCard from '../../components/card/ONESimpleCard.vue'
import ONEChat from '../../components/etc/ONEChat.vue'
import ONELinearProgress from '../../components/etc/ONELinearProgress.vue'
// 이미지
import ONEImg from '../../components/img/ONEImg.vue'
// popup
import POPCommonGrid from '../../components/popup/pop_commonGrid.vue'
import popApp from '../../components/popup/pop_app.vue'
import POPFile from '../../components/popup/pop_file.vue'
import POPUser from '../../components/popup/pop_user.vue'
import POPMulti from '../../components/popup/pop_multi.vue'
import POPCompany from '../../components/popup/pop_company.vue'
import POPSrvrCompany from '../../components/popup/pop_srvrCompany.vue'
import POPSrvrMst from '../../components/popup/pop_srvrMst.vue'
import POPBizPlace from '../../components/popup/pop_bizPlace.vue'
import POPChartDataSource from '../../components/popup/pop_chartDataSource.vue'
import POPMail from '../../components/popup/pop_mail.vue'
import POPPro from '../../components/popup/pop_proc.vue'
import POPExcelUpload from '../../components/popup/pop_excelUpload.vue'
import POPItem from '../../components/popup/pop_item.vue'
import POPItemMaster from '../../components/popup/pop_itemMaster.vue'
import POPApprove from '../../components/popup/pop_approve.vue'
import POPTariffApproveHistory from '../../components/popup/pop_tariffApproveHistory.vue'
import POPTariffRevision from '../../components/popup/pop_tariffRevision.vue'
import POPSql from '../../components/popup/pop_sqlCode.vue'
import POPCountry from '../../components/popup/pop_country.vue'
import POPEmailTemplate from '../../components/popup/pop_emailTemplate.vue'
import POPGridSQL from '../../components/popup/pop_grid_sqlCode.vue'
import POPGridMultText from '../../components/popup/pop_grid_multText.vue'
import POPGridMenu from '../../components/popup/pop_grid_menuList.vue'
import POPCenter from '../../components/popup/pop_center.vue'
import POPCustomer from '../../components/popup/pop_customer.vue'
import POPPlant from '../../components/popup/pop_plant.vue'
import POPDivision from '../../components/popup/pop_division.vue'
import POPTextArea from '../../components/popup/pop_textArea.vue'
import POPDept from '../../components/popup/pop_dept.vue'
import POPWarehouse from '../../components/popup/pop_warehouse.vue'
import POPBiz from '../../components/popup/pop_biz.vue'
import POPDeliveryArea from '../../components/popup/pop_deliveryArea.vue'
import POPVehicle from '../../components/popup/pop_vehicle.vue'
import POPShippingPoint from '../../components/popup/pop_shippingPoint.vue'
import POPTeam from '../../components/popup/pop_team.vue'
import POPStorage from '../../components/popup/pop_storage.vue'
import POPOwner from '../../components/popup/pop_owner.vue'
import POPVendor from '../../components/popup/pop_vendor.vue'
import POPStructure from '../../components/popup/pop_structure.vue'
import POPApproveUser from '../../components/popup/pop_approveUser.vue'
import POPAccount from '../../components/popup/pop_account.vue'
import POPLogistics from '../../components/popup/pop_logistics.vue'
import POPCustomerItem from '../../components/popup/pop_customerItem.vue'
import POPInvoiceApprove from '../../components/popup/pop_invoiceApprove.vue'
import POPInvoice from '../../components/popup/pop_invoice.vue'
import POPInvoiceGroup from '../../components/popup/pop_invoiceGroup.vue'
import POPRounds from '../../components/popup/pop_rounds.vue'
import POPTransit from '../../components/popup/pop_transit.vue'
import POPReTransit from '../../components/popup/pop_reTransit.vue'
import POPCloseTarget from '../../components/popup/pop_closeTarget.vue'
import POPCloseManual from '../../components/popup/pop_closeManual.vue'
import POPDeptCheck from '../../components/popup/pop_deptCheck.vue'
import POPDynamicGrid from '../../components/popup/pop_dynamicGrid.vue'
import POPCreateInvoice from '../../components/popup/pop_createInvoice.vue'
import POPRemainInvoice from '../../components/popup/pop_remainInvoice.vue'
import POPInvoiceApproveHistory from '../../components/popup/pop_invoiceApproveHistory.vue'
import POPBillingDateCompare from '../../components/popup/pop_billingDateCompare.vue'
import POPReqApproveHis from '../../components/popup/pop_reqApproveHis.vue'
import POPContractApproveHistory from '../../components/popup/pop_contractApproveHistory.vue'
import POPApproveContract from '../../components/popup/pop_approveContract.vue'
import POPContractRevision from '../../components/popup/pop_contractRevision.vue'
import POPContractProcess from '../../components/popup/pop_contractProcess.vue'
import POPWhOwnMap from '../../components/popup/pop_whOwnMap.vue'
import POPOwnWhMap from '../../components/popup/pop_ownWhMap.vue'
import POPSection from '../../components/popup/pop_section.vue'
import POPLabelRprt from '../../components/popup/pop_labelRprt.vue'
import POPBizInvMix from '../../components/popup/pop_bizInvMix.vue'
import POPOwnVnd from 'components/popup/pop_ownVnd.vue'
import POPOwnPtn from 'components/popup/pop_ownPtn.vue'
import POPBizList from 'components/popup/pop_bizList.vue'
import POPItemDtlOp from 'components/popup/pop_itemDtlOp.vue'
/* WMS */
import POPOuMst from '../../components/popup/pop_ouMst.vue'
import POPDock from '../../components/popup/pop_dock.vue'
import POPShiptoSite from '../../components/popup/pop_shiptoSite.vue'
import POPItemCompany from '../../components/popup/pop_itemCompany.vue'
import POPOu from '../../components/popup/pop_ou.vue'
import POPOwnerShip from '../../components/popup/pop_ownerShip.vue'
import POPOwnerBiz from '../../components/popup/pop_ownBiz.vue'
import POPOwnerVnd from '../../components/popup/pop_ownerVnd.vue'
import POPZone from '../../components/popup/pop_zone.vue'
import POPItmcoItem from '../../components/popup/pop_itmcoItem.vue'
import POPItmcoOu from '../../components/popup/pop_itmcoOu.vue'
import POPVndSite from '../../components/popup/pop_vnd_site.vue'
import POPShiptoSiteList from '../../components/popup/pop_shiptoSiteList.vue'
import POPVendorSite from '../../components/popup/pop_vndSite.vue'
import POPMid from '../../components/popup/pop_mid.vue'
import POPLocation from '../../components/popup/pop_location.vue'
import POPCntr from '../../components/popup/pop_cntr.vue'
import POPOwnItmcoItem from '../../components/popup/pop_ownItmcoItem.vue'
import POPItmcoOuItem from '../../components/popup/pop_itmcoOuItem.vue'

import POPLot from '../../components/popup/pop_lot.vue'
import POPAppFile from '../../components/popup/pop_app_file.vue'
import POPInvLot from '../../components/popup/pop_invLot.vue'

/* 한마루 */
// import HANMARUIFrame from '../../components/etc/HANMARUIFrame.vue'
// KPI
// import KPIPage from '../../components/WONIK/KPIPage.vue'
// import KPICard from '../../components/WONIK/KPICard.vue'
// import KPIMainCard from '../../components/WONIK/KPIMainCard.vue'
// import DashboardCard from '../../components/WONIK/DashboardCard.vue'
// import C3ChartBase from '../../components/chart/c3/C3ChartBase.vue'
import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store }) => {
  // 코드미러
  app.component(ONECodeMirror.name, ONECodeMirror)
  // 그리드
  app.component(ONEGrid.name, ONEGrid)
  app.component(ONEPivot.name, ONEPivot)
  app.component(ONEDynamicGrid.name, ONEDynamicGrid)
  app.component(ONEGridHeaderContent.name, ONEGridHeaderContent)
  app.component(ONEGridPaging.name, ONEGridPaging)
  // input 관련
  app.component(ONEText.name, ONEText)
  app.component(ONENumber.name, ONENumber)
  app.component(ONESelect.name, ONESelect)
  app.component(ONECheckBox.name, ONECheckBox)
  app.component(ONECombo.name, ONECombo)
  app.component(ONEBreak.name, ONEBreak)
  app.component(ONEDate.name, ONEDate)
  app.component(ONEMonth.name, ONEMonth)
  app.component(ONEDateFromTo.name, ONEDateFromTo)
  app.component(ONEMonthFromTo.name, ONEMonthFromTo)
  app.component(ONEErrorBox.name, ONEErrorBox)
  app.component(ONEEditor.name, ONEEditor)
  app.component(ONEYear.name, ONEYear)
  app.component(ONETime.name, ONETime)
  app.component(ONESearchInput.name, ONESearchInput)
  app.component(ONEPopText.name, ONEPopText)
  app.component(ONEField.name, ONEField)
  app.component(ONERadio.name, ONERadio)
  app.component(ONECkEditor.name, ONECkEditor)
  // button 관련
  app.component(ONEButton.name, ONEButton)
  app.component(ONEButtonGroup.name, ONEButtonGroup)
  app.component(ONEMainButtonGroup.name, ONEMainButtonGroup)
  app.component(ONEAddButtonGroup.name, ONEAddButtonGroup)
  // layout 관련
  app.component(ONEPage.name, ONEPage)
  app.component(MenuTitle.name, MenuTitle)
  app.component(ONESplitter.name, ONESplitter)
  app.component(ONESearchCard.name, ONESearchCard)
  app.component(ONESearchCondition.name, ONESearchCondition)
  app.component(ONEMainCard.name, ONEMainCard)
  app.component(ONETab.name, ONETab)
  app.component(ONETabPanels.name, ONETabPanels)
  app.component(ONEToolBar.name, ONEToolBar)
  // 카드
  app.component(ONECard.name, ONECard)
  app.component(ONECardTitle.name, ONECardTitle)
  app.component(ONEPopupTitle.name, ONEPopupTitle)
  app.component(ONECardSection.name, ONECardSection)
  app.component(ONECardForm.name, ONECardForm)
  app.component(ONEFlexCard.name, ONEFlexCard)
  // Dialog
  app.component(ONEDialog.name, ONEDialog)
  // 기타
  app.component(bigExcelFrame.name, bigExcelFrame)
  app.component(ONELine.name, ONELine)
  app.component(ONEJsonTree.name, ONEJsonTree)
  app.component(ONETile.name, ONETile)
  app.component(ONESimpleCard.name, ONESimpleCard)
  app.component(ONEChat.name, ONEChat)
  app.component(ONELinearProgress.name, ONELinearProgress)
  // 이미지
  app.component(ONEImg.name, ONEImg)
  // popup
  app.component(POPCommonGrid.name, POPCommonGrid)
  app.component(POPFile.name, POPFile)
  app.component(POPUser.name, POPUser)
  app.component(POPMulti.name, POPMulti)
  app.component(POPPro.name, POPPro)
  app.component(POPCompany.name, POPCompany)
  app.component(POPSrvrCompany.name, POPSrvrCompany)
  app.component(POPSrvrMst.name, POPSrvrMst)
  app.component(POPBizPlace.name, POPBizPlace)
  app.component(POPChartDataSource.name, POPChartDataSource)
  app.component(POPMail.name, POPMail)
  app.component(POPExcelUpload.name, POPExcelUpload)
  app.component(POPItem.name, POPItem)
  app.component(POPItemMaster.name, POPItemMaster)
  app.component(POPApprove.name, POPApprove)
  app.component(POPTariffApproveHistory.name, POPTariffApproveHistory)
  app.component(POPTariffRevision.name, POPTariffRevision)
  app.component(POPSql.name, POPSql)
  app.component(POPCountry.name, POPCountry)
  app.component(POPEmailTemplate.name, POPEmailTemplate)
  app.component(POPGridMultText.name, POPGridMultText)
  app.component(POPGridSQL.name, POPGridSQL)
  app.component(POPGridMenu.name, POPGridMenu)
  app.component(POPPlant.name, POPPlant)
  app.component(POPDivision.name, POPDivision)
  app.component(POPTextArea.name, POPTextArea)
  app.component(POPCenter.name, POPCenter)
  app.component(POPCustomer.name, POPCustomer)
  app.component(POPDept.name, POPDept)
  app.component(POPWarehouse.name, POPWarehouse)
  app.component(POPBiz.name, POPBiz)
  app.component(POPDeliveryArea.name, POPDeliveryArea)
  app.component(POPVehicle.name, POPVehicle)
  app.component(POPShippingPoint.name, POPShippingPoint)
  app.component(POPTeam.name, POPTeam)
  app.component(POPStorage.name, POPStorage)
  app.component(POPOwner.name, POPOwner)
  app.component(POPVendor.name, POPVendor)
  app.component(POPStructure.name, POPStructure)
  app.component(POPApproveUser.name, POPApproveUser)
  app.component(POPAccount.name, POPAccount)
  app.component(POPLogistics.name, POPLogistics)
  app.component(POPCustomerItem.name, POPCustomerItem)
  app.component(POPInvoiceApprove.name, POPInvoiceApprove)
  app.component(POPInvoice.name, POPInvoice)
  app.component(POPInvoiceGroup.name, POPInvoiceGroup)
  app.component(POPRounds.name, POPRounds)
  app.component(POPTransit.name, POPTransit)
  app.component(POPReTransit.name, POPReTransit)
  app.component(POPCloseTarget.name, POPCloseTarget)
  app.component(POPCloseManual.name, POPCloseManual)
  app.component(POPDeptCheck.name, POPDeptCheck)
  app.component(POPDynamicGrid.name, POPDynamicGrid)
  app.component(POPCreateInvoice.name, POPCreateInvoice)
  app.component(POPRemainInvoice.name, POPRemainInvoice)
  app.component(POPInvoiceApproveHistory.name, POPInvoiceApproveHistory)
  app.component(POPBillingDateCompare.name, POPBillingDateCompare)
  app.component(POPReqApproveHis.name, POPReqApproveHis)
  app.component(POPContractApproveHistory.name, POPContractApproveHistory)
  app.component(POPApproveContract.name, POPApproveContract)
  app.component(POPContractRevision.name, POPContractRevision)
  app.component(POPContractProcess.name, POPContractProcess)
  app.component(POPWhOwnMap.name, POPWhOwnMap)
  app.component(POPOwnWhMap.name, POPOwnWhMap)
  app.component(POPLabelRprt.name, POPLabelRprt)
  app.component(POPBizInvMix.name, POPBizInvMix)
  /* WMS */
  app.component(POPOuMst.name, POPOuMst)
  app.component(POPDock.name, POPDock)
  app.component(POPShiptoSite.name, POPShiptoSite)
  app.component(POPItemCompany.name, POPItemCompany)
  app.component(POPOu.name, POPOu)
  app.component(POPOwnerShip.name, POPOwnerShip)
  app.component(POPOwnerBiz.name, POPOwnerBiz)
  app.component(POPOwnerVnd.name, POPOwnerVnd)
  app.component(POPVndSite.name, POPVndSite)
  app.component(POPZone.name, POPZone)
  app.component(POPSection.name, POPSection)
  app.component(POPShiptoSiteList.name, POPShiptoSiteList)
  app.component(POPOwnVnd.name, POPOwnVnd)
  app.component(POPItmcoOu.name, POPItmcoOu)
  app.component(POPItmcoItem.name, POPItmcoItem)
  app.component(POPVendorSite.name, POPVendorSite)
  app.component(POPMid.name, POPMid)
  app.component(POPLocation.name, POPLocation)
  app.component(POPCntr.name, POPCntr)
  app.component(POPOwnItmcoItem.name, POPOwnItmcoItem)
  app.component(POPItmcoOuItem.name, POPItmcoOuItem)

  app.component(POPLot.name, POPLot)
  app.component(POPAppFile.name, POPAppFile)
  app.component(POPOwnPtn.name, POPOwnPtn)
  app.component(POPInvLot.name, POPInvLot)
  app.component(POPBizList.name, POPBizList)
  app.component(POPItemDtlOp.name, POPItemDtlOp)

  /* 한마루 */
  // app.component(HANMARUIFrame.name, HANMARUIFrame)
  // import ONEChart from '../../components/chart/ONEChart.vue'
  // app.component(ONEChart.name, ONEChart)
  // import ONEChartPage from '../../components/chart/ONEChartPage.vue'
  // app.component(ONEChartPage.name, ONEChartPage)
  // import ONEChartCard from '../../components/chart/ONEChartCard.vue'
  // app.component(ONEChartCard.name, ONEChartCard)
  // import ONEChartKPI from '../../components/chart/ONEChartKPI.vue'
  // app.component(ONEChartKPI.name, ONEChartKPI)
  // import ONEChartHeader from '../../components/chart/ONEChartHeader.vue'
  // app.component(ONEChartHeader.name, ONEChartHeader)
  //
  // import ONEChartColumn from '../../components/chart/ONEChartColumn.vue'
  // app.component(ONEChartColumn.name, ONEChartColumn)
  // import ONEBasicChart from '../../components/chart/ONEBasicChart.vue'
  // app.component(ONEBasicChart.name, ONEBasicChart)
  //
  // import ONEChartGrid from '../../components/chart/ONEChartGrid.vue'
  // app.component(ONEChartGrid.name, ONEChartGrid)
  //
  // KPI
  // app.component(KPIPage.name, KPIPage)
  // app.component(KPICard.name, KPICard)
  // app.component(KPIMainCard.name, KPIMainCard)
  // app.component(DashboardCard.name, DashboardCard)
  // app.component(C3ChartBase.name, C3ChartBase)

  /* eslint-disable */
  Number.prototype.format = function () {
    if (this === 0) return 0

    var reg = /(^[+-]?\d+)(\d{3})/
    var n = (this + '')

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2')

    return n
  }

  // 문자열 타입에서 쓸 수 있도록 format() 함수 추가
  String.prototype.format = function () {
    var num = parseFloat(this)
    if (isNaN(num)) return "0"

    return num.format()
  }
  /* eslint-enable */

  const notifyMethods = {
    notify: (message, type, isMlt) => {
      Notify.create({
        color: type === 'E' ? 'negative' : 'info',
        position: 'top',
        message: isMlt ? message : app.config.globalProperties.$getMlt(message),
        icon: 'report_problem'
      })
    }
  }
  const dialogMethods = {
    bDialog: false,
    confirm: async (message, title, type, isMlt, gubun) => {
      if (app.config.globalProperties.$bDialog) return
      app.config.globalProperties.$bDialog = true
      const msg = isMlt ? message : app.config.globalProperties.$getMlt(message)
      let logoutTimer
      return new Promise(function (resolve, reject) {
        const dialog = Dialog.create({
          component: ONEConfirm,
          parent: this,
          componentProps: {
            title: app.config.globalProperties.$isNull(title) ? app.config.globalProperties.$getMlt('T_CONFIRM') : (isMlt ? title : app.config.globalProperties.$getMlt(title)),
            message: msg
          },
          cancel: true,
          persistent: true
        }).onOk(() => {
          app.config.globalProperties.$bDialog = false
          clearInterval(logoutTimer)
          resolve(true)
        }).onCancel(() => {
          app.config.globalProperties.$bDialog = false
          clearInterval(logoutTimer)
          resolve(false)
        }).onDismiss(() => {
          app.config.globalProperties.$bDialog = false
          clearInterval(logoutTimer)
          resolve(false)
        })
        if (gubun === 'logout') {
          let seconds = 10
          logoutTimer = setInterval(() => {
            seconds--

            if (seconds > 0) {
              dialog.update({
                message: msg + `\r\n ${seconds} ${seconds > 1 ? '초 후 로그아웃 예정입니다.' : ''}.`,
                okLabel: '시간 연장',
                cancelLabel: '로그 아웃'
              })
            } else {
              clearInterval(logoutTimer)
              dialog.hide()
            }
          }, 1000)
        }
      })
    },
    alert: (message, title, type, isMlt) => {
      if (app.config.globalProperties.$bDialog) return
      return new Promise(function (resolve, reject) {
        app.config.globalProperties.$bDialog = true
        Dialog.create({
          component: ONEAlert,
          componentProps: {
            title: isMlt ? title : app.config.globalProperties.$getMlt(title),
            message: isMlt ? message : app.config.globalProperties.$getMlt(message),
            type: type
          },
          parent: this,
          cancel: false
        }).onOk(() => {
          app.config.globalProperties.$bDialog = false
          resolve(true)
        }).onCancel(() => {
          app.config.globalProperties.$bDialog = false
          resolve(false)
        }).onDismiss(() => {
          app.config.globalProperties.$bDialog = false
          resolve(false)
        })
      })
    },
    loginAlert: async (message, title, type, isMlt) => { // 로그인할때 언어별 다국어체크가 안됨 그래서그냥 복붙
      if (app.config.globalProperties.$bDialog) return
      return new Promise(function (resolve, reject) {
        dialogMethods.bDialog = true
        Dialog.create({
          component: ONEAlert,
          parent: this,
          componentProps: {
            title: 'Error',
            message: 'You do not have registered app permissions.',
            type: type
          },
          cancel: false
        }).onOk(() => {
          dialogMethods.bDialog = false
          resolve(true)
        }).onCancel(() => {
          dialogMethods.bDialog = false
          resolve(false)
        }).onDismiss(() => {
          dialogMethods.bDialog = false
          resolve(false)
        })
      })
    }
  }

  const popup = {
    app: async () => {
      return new Promise((resolve, reject) => {
        const t = app.component('popApp', {
          methods: {
            closeHandler (fn, arg) {
              return function () {
                fn(arg)
                t.$destroy()
                t.$el.remove()
              }
            }
          },
          render (h) {
            return h(popApp, {
              on: {
                ddd: this.closeHandler(resolve, 'WMS'),
                fff: this.closeHandler(reject, 'MES')
              }
            })
          }
        }).$mount()
        document.body.appendChild(t.$el)
        t.open()
      })
    }
  }
  store.$app = app

  app.config.globalProperties.$app = popup.app
  app.config.globalProperties.$bDialog = dialogMethods.bDialog
  app.config.globalProperties.$confirm = dialogMethods.confirm
  app.config.globalProperties.$loginAlert = dialogMethods.loginAlert
  app.config.globalProperties.$alert = dialogMethods.alert
  app.config.globalProperties.$notify = notifyMethods.notify
})
