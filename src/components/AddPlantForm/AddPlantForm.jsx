import React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { NumericTextBox, Input } from '@progress/kendo-react-inputs';
import { Rating } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { plusIcon } from '@progress/kendo-svg-icons';
import { Error, Label } from '@progress/kendo-react-labels';
import './addPlantForm.css';

const AddPlantForm = ({
  newPlant,
  error,
  handleInputChange,
  handleDateChange,
  handleAddPlant,
}) => {
  return (
    <div>
      <h3>Add New Tomato Plant</h3>
      <div className='add-plant-form'>
        <div className='form-grid'>
          <div className='input-group'>
            <Label editorId='variety'>Variety Name:</Label>
            <Input
              name='variety'
              id='variety'
              placeholder='Variety Name'
              value={newPlant.variety}
              onChange={handleInputChange}
            />
          </div>

          <div className='input-group'>
            <Label editorId='height'>Plant Height (cm):</Label>
            <NumericTextBox
              name='height'
              id='height'
              placeholder='Height (cm)'
              value={newPlant.height}
              onChange={(e) => handleDateChange('height', e.value)}
              min={0}
            />
          </div>

          <div className='input-group'>
            <Label editorId='fruitSize'>Avg. Fruit Size (cm):</Label>
            <NumericTextBox
              name='fruitSize'
              id='fruitSize'
              placeholder='Fruit Size (cm)'
              value={newPlant.fruitSize}
              onChange={(e) => handleDateChange('fruitSize', e.value)}
              min={0}
            />
          </div>

          <div className='input-group'>
            <Label editorId='plantingDate'>Planting Date:</Label>
            <DatePicker
              format='dd/MM/yyyy'
              name='plantingDate'
              id='plantingDate'
              placeholder='Planting Date'
              value={newPlant.plantingDate}
              onChange={(e) => handleDateChange('plantingDate', e.value)}
            />
          </div>

          <div className='input-group'>
            <Label editorId='firstHarvest'>First Harvest:</Label>
            <DatePicker
              format='dd/MM/yyyy'
              name='firstHarvest'
              id='firstHarvest'
              placeholder='First Harvest'
              value={newPlant.firstHarvest}
              onChange={(e) => handleDateChange('firstHarvest', e.value)}
            />
          </div>

          <div className='input-group'>
            <Label editorId='taste'>Taste Rating:</Label>
            <Rating
              name='taste'
              id='taste'
              value={newPlant.taste}
              onChange={(e) => handleDateChange('taste', e.value)}
              min={1}
              max={5}
            />
          </div>
        </div>

        {error && <Error>{error}</Error>}

        <Button
          themeColor='primary'
          icon='plus'
          svgIcon={plusIcon}
          onClick={handleAddPlant}
          style={{ backgroundColor: '#0d5039', borderColor: '#0d5039' }}
        >
          Add Plant
        </Button>
      </div>
    </div>
  );
};

export default AddPlantForm;
