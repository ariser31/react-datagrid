'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'country',
          enableRowGroup: true,
          filter: 'agMultiColumnFilter',
        },
        {
          field: 'year',
          enableRowGroup: true,
        },
        {
          field: 'athlete',
          minWidth: 180,
        },
        {
          field: 'gold',
          aggFunc: 'sum',
        },
        {
          field: 'silver',
          aggFunc: 'sum',
        },
        {
          field: 'bronze',
          aggFunc: 'sum',
        },
        {
          field: 'total',
          aggFunc: 'sum',
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ['filterMenuTab'],
      },
      sideBar: { toolPanels: ['filters'] },
     
      autoGroupColumnDef: { minWidth: 200 },
      rowGroupPanelShow: 'always',
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            suppressDragLeaveHidesColumns={true}
            suppressMakeColumnVisibleAfterUnGroup={true}
            rowGroupPanelShow={this.state.rowGroupPanelShow}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
