<template>
  <ONEPage >
    <ONESearchCard ref="headerCard" :mstCd="this.$route.query.mstCd">
      <template v-slot:btnGroup>
        <ONEMainButtonGroup ref="mainBtnGroup"
                            :buttonSet="{
            search: true,
            init: true,
            save: true,
            close: true
            }"
                            :conditionVisible="conditionVisible"
                            @onShow="onShow"
                            @onSearch="onSearch"
                            @onInit="onInit"
                            @onSave="onSave"
                            @onClose="onClose"
        />
      </template>
      <template v-slot:searchCondition>
        <ONESearchCondition ref="searchCard" :conditionVisible="conditionVisible" @onShow="onShow">
          <ONEText label="APPCD" scale="2" v-model="dsSearch.appCd" :maxlength="10" @enter="onSearch"/>
          <ONEText label="APPNM" scale="2" v-model="dsSearch.appNm" :maxlength="50" @enter="onSearch"/>
        </ONESearchCondition>
      </template>
    </ONESearchCard>

    <ONELine/>

    <ONEMainCard :headerHeight="this.conditionHeight">
      <ONEGrid
          ref="myGrid"
          title="APPLIST"
          toolBar
          keepFilter
          :propCollayout="createColumnData()"
          :propAuiProp="gridProps"
          :btnGroup="{
          pdf: true,
          excel: true,
          plus: true,
          minus: true
          }">
      </ONEGrid>
    </ONEMainCard>

    <div class="about">
      <h1>This is an about page</h1>

      <h1>This is an about page</h1>

      <h1>This is an about page</h1>

      <h1>This is an about page</h1>
      <router-view />
    </div>
  </ONEPage>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
export default {
  mixins: [],
  name: 'APP',

  data() {
    return {
      // 그리드 관련
      gridProps: {
        rowIdField: 'serialkey',
        showRowCheckColumn: true,
        showStateColumn: true,
        editable: true,
        isGenNewRowsOnPaste: true
      },
      grid: null,
      // 화면 관련
      conditionVisible: true,
      conditionHeight: 100,
      // 검색 조건
      dsSearch: {
        appCd: '',
        appNm: ''
      },
      selectAppType: []
    }
  },

  methods: {
    onShow() {
      this.conditionVisible = !this.conditionVisible
      this.onResize()
    },
    async onSearch() {
      if (!await this.$refs.searchCard.validate()) return
      // 로딩바 보이기
      await this.grid.showLoader()
      // 검색조건 데이터
      const sendData = [{
        ds_json: [this.dsSearch]
      }]
      this.$fetch_sdp('adm/app', sendData)
          .then(async (res) => {
            if (res.data.rtnList.length < 1) {
              await this.$notify('M_NOTFOUND') // 검색결과가 없습니다
            }
            this.grid.setData(res.data.rtnList)
          })
          .catch(error => error)
          .finally(() => {
            this.grid.removeLoader()
            this.onResize()
          })
    },
    onInit() {
      this.$dsClear(this.dsSearch)
      this.$refs.searchCard.resetValidation()
    },
    async onSave() {
      this.grid.setFlag() // flag 세팅
      // 체크된 행 체크
      if (!this.grid.isCheckedRow()) return

      // 필수값 체크
      if (!await this.grid.chkNecessary()) return

      if (!await this.$confirm('M_CONFIRMSAVE')) return // 저장하시겠습니까?

      const saveDs = this.grid.getCheckedRowItems()
      const sendData = [{
        ds_json: saveDs
      }]
      this.$save_sdp('adm/app', sendData)
          .then(async (res) => {
            this.$notify('M_SUCCESS', 'positive') // 정상적으로 처리되엇습니다.
            this.onSearch()
          })
          .catch(async (error) => error)
          .finally(() => {
            this.onResize()
          })
    },
    async onClose() {
    },
    createColumnData() {
      /* eslint-disable */
      const columnLayout = [
        {
          dataField: 'serialkey',
          headerText: 'serialkey',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-left-column',
          headerStyle: 'grid-font-necessary',
          visible: false
        },
        {
          dataField: 'appCd',
          headerText: 'APPCD',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-left-column',
          headerStyle: 'grid-font-necessary',
          editRenderer: {
            type: "InputEditRenderer",
            // showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
            // onlyNumeric : true, // 0~9만 입력가능
            // allowPoint : true, // 소수점( . ) 도 허용할지 여부
            // allowNegative : true, // 마이너스 부호(-) 허용 여부
            // textAlign : "right", // 오른쪽 정렬로 입력되도록 설정
            maxlength: 5 // 글자수 10으로 제한 (천단위 구분자 삽입(autoThousandSeparator=true)로 한 경우 구분자 포함해서 10자로 제한)
            // autoThousandSeparator : true // 천단위 구분자 삽입 여부
          }
        },
        {
          dataField: 'appNm',
          headerText: 'APPNM',
          width: 150,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-left-column',
          headerStyle: 'grid-font-necessary'
        },
        {
          dataField: 'priorities',
          headerText: 'PRIORITIES',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-right-column',
          headerStyle: 'grid-font-normal',
          editRenderer: {type: "InputEditRenderer", onlyNumeric: true},
          dataType: 'numeric'
        },
        {
          dataField: 'badge',
          headerText: 'BADGE',
          width: 200,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-left-column',
          headerStyle: 'grid-font-normal',
          visible: false
        },
        {
          dataField: 'icon',
          headerText: 'ICON',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-left-column',
          headerStyle: 'grid-font-normal'
        },
        {
          dataField: 'regIp',
          headerText: 'REGIP',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-center-column'
        },
        {
          dataField: 'regUsr',
          headerText: 'REGUSR',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-left-column'
        },
        {
          dataField: 'regDt',
          headerText: 'REGDT',
          width: 200,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-center-column'
        },
        {
          dataField: 'updIp',
          headerText: 'UPDIP',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-center-column'
        },
        {
          dataField: 'updUsr',
          headerText: 'UPDUSR',
          width: 100,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-left-column'
        },
        {
          dataField: 'updDt',
          headerText: 'UPDDT',
          width: 200,
          filter: {showIcon: true, displayFormatValues: true},
          style: 'aui-grid-center-column'
        }
      ]
      return columnLayout
      /* eslint-enable */
    },
    fn_cellEditBegin(event) {
      const checkFlag = this.grid.getRowState(event.item.serialkey)
      if (checkFlag === 'I') {
        if (['regIp', 'regUsr', 'regDt',
          'updIp', 'updUsr', 'updDt'].indexOf(event.dataField) > -1) return false
        return true
      } else {
        if (['regIp', 'regUsr', 'regDt',
          'updIp', 'updUsr', 'updDt', 'appCd'].indexOf(event.dataField) > -1) return false
      }
    },
    fn_cellEditEnd(event) {
      this.grid.autoCheck(event)
    },
    onResize() {
      this.$nextTick(function () {
        this.conditionHeight = this.$height(this.$refs.headerCard.$el)
        this.$nextTick(function () {
          try {
            this.grid.resize()
          } catch {
          }
        })
      })
    }
  }
}
</script>