import React from 'react'
import { LongDate, ShortDate } from './formatters'

export const wellColumns = [{
          Header: 'ID',
          accessor: 'id',
          Width: 175,
        }, {
          Header: 'SideTrackID',
          accessor: 'sideTrackID',
          Width: 175,
          sortable: false
        }, {
          Header: 'WellName',
          accessor: 'wellName',
          Width: 175,
          sortable: false
        }, {
          Header: 'WellType',
          accessor: 'wellType',
          Width: 175,
          sortable: false
        }, {
          Header: 'ClientDepth2',
          accessor: 'clientDepth2',
          Width: 175,
          sortable: false
        }, {
          Header: 'QRIDepth2',
          accessor: 'qriDepth2',
          Width: 175,
          sortable: false
        }, {
          Header: 'QRIDepthRevised',
          accessor: 'qriDepthRevised',
          Width: 175,
          sortable: false,
        }, {
          Header: 'ClientHoleSize',
          accessor: 'clientHoleSize',
          Width: 175,
          sortable: false
        }, {
          Header: 'QRIHoleSize',
          accessor: 'qriHoleSize',
          Width: 175,
          sortable: false
        }, {
          Header: 'QRIHoleSizeRevised',
          accessor: 'qriHoleSizeRevised',
          Width: 175,
          sortable: false
        }, {
          Header: 'OperationDate',
          accessor: 'operationDate',
          Width: 175,
          sortable: false,
          Cell: ShortDate
        }, {
          Header: 'FromDateTime',
          accessor: 'fromDateTime',
          Width: 175,
          sortable: false,
          Cell: LongDate
        }, {
          Header: 'ToDateTime',
          accessor: 'toDateTime',
          Width: 175,
          sortable: false,
          Cell: LongDate
        }, {
          Header: 'DateCheck',
          accessor: 'dateCheck',
          Width: 175,
          sortable: false
        }, {
          Header: 'DurationDays',
          accessor: 'durationDays',
          Width: 175,
          sortable: false,
        }, {
          Header: 'TimeCheck',
          accessor: 'timeCheck',
          Width: 175,
          sortable: false
        }, {
          Header: 'Footage',
          accessor: 'footage',
          Width: 175,
          sortable: false
        }, {
          Header: 'ROPM_hr',
          accessor: 'ropmHr',
          Width: 175,
          sortable: false
        }, {
          Header: 'DFS',
          accessor: 'dfs',
          Width: 175,
          sortable: false
        }, {
          Header: 'ActivityDescription',
          accessor: 'description',
          Width: 175,
          sortable: false
        }, {
          Header: 'ActivityDescriptionEnglish',
          accessor: 'descriptionEnglish',
          Width: 175,
          sortable: false
        }, {
          Header: 'ClientP_NP',
          accessor: 'clientP_NP',
          Width: 175,
          sortable: false
        }, {
          Header: 'QRIRevisedP_NP',
          accessor: 'qriP_NPRevised',
          Width: 175,
          sortable: false
        }, {
          Header: 'Probability',
          accessor: 'prob',
          Width: 175,
          sortable: false
        }, {
          Header: 'ClientPhase',
          accessor: 'clientPhase',
          Width: 175,
          sortable: false
        }, {
          Header: 'QRIMajorOperation',
          accessor: 'qriMajorOperation',
          Width: 175,
          sortable: false
        }, {
          Header: 'NPTCategory',
          accessor: 'nptCategory',
          Width: 175,
          sortable: false
        }, {
          Header: 'NPTType',
          accessor: 'nptType',
          Width: 175,
          sortable: false
        }]




