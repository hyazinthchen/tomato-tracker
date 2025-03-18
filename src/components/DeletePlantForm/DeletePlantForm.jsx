import React from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { trashIcon } from '@progress/kendo-svg-icons';
import { Error, Label } from '@progress/kendo-react-labels';
import './deletePlantForm.css';

const DeletePlantForm = ({
  deleteId,
  error,
  handleDeleteIdChange,
  handleDeletePlant,
}) => {
  return (
    <div>
      <h3>Delete Tomato Plant</h3>
      <div className='delete-plant-form'>
        <div className='input-group'>
          <Label editorId='deleteId'>Plant ID:</Label>
          <NumericTextBox
            id='deleteId'
            placeholder='Enter Plant ID'
            value={deleteId}
            onChange={(e) => handleDeleteIdChange(e.value)}
            min={1}
          />
        </div>
        <Button
          themeColor='primary'
          icon='trash'
          svgIcon={trashIcon}
          onClick={handleDeletePlant}
        >
          Delete Plant
        </Button>

        {error && <Error>{error}</Error>}
      </div>
    </div>
  );
};

export default DeletePlantForm;
