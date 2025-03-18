import React from 'react';
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridSearchBox,
} from '@progress/kendo-react-grid';
import { CSVLink } from 'react-csv';
import plantIcon from '../../images/plant.svg';
import './plantGrid.css';

const PlantGrid = ({
  data,
  sort,
  onSortChange,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      <div className='headline-wrapper'>
        <img src={plantIcon} alt='Image of a hand holding a plant' />
        <h2>Your Tomato Plants</h2>
      </div>
      <Grid
        data={data}
        sortable
        sort={sort}
        onSortChange={onSortChange}
        dataItemKey='id'
        style={{ minWidth: '100%' }}
      >
        <GridToolbar>
          <GridSearchBox
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CSVLink
            data={data}
            filename='tomato_plants.csv'
            className='k-button k-button-md k-button-solid k-button-solid-primary k-rounded-md'
          >
            Export to CSV
          </CSVLink>
        </GridToolbar>
        <GridColumn field='id' title='Plant Number' width='150px' />
        <GridColumn field='variety' title='Variety Name' width='200px' />
        <GridColumn field='height' title='Plant Height (cm)' width='150px' />
        <GridColumn
          field='fruitSize'
          title='Avg. Fruit Size (cm)'
          width='150px'
        />
        <GridColumn
          field='formattedPlantingDate'
          title='Planting Date'
          sortable={false}
          width='150px'
        />
        <GridColumn
          field='formattedFirstHarvest'
          title='First Harvest'
          sortable={false}
          width='150px'
        />
        <GridColumn
          field='growthPeriod'
          title='Growth Period (Days)'
          width='150px'
        />
        <GridColumn field='taste' title='Taste Rating' width='150px' />
      </Grid>
    </>
  );
};

export default PlantGrid;
