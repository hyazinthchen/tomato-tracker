import React, { useState, useEffect } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { NumericTextBox, Input } from '@progress/kendo-react-inputs';
import { Rating } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { trashIcon, plusIcon } from '@progress/kendo-svg-icons';
import { Error } from '@progress/kendo-react-labels';
import { orderBy } from '@progress/kendo-data-query';

const PlantSection = ({ onPlantAdded }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('plants');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [newPlant, setNewPlant] = useState({
    variety: '',
    height: '',
    fruitSize: '',
    plantingDate: null,
    firstHarvest: null,
    taste: 0,
  });

  const [deleteId, setDeleteId] = useState('');
  const [error, setError] = useState('');
  const [sort, setSort] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlant({ ...newPlant, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setNewPlant({ ...newPlant, [name]: value });
  };

  const handleAddPlant = () => {
    if (
      !newPlant.variety ||
      !newPlant.height ||
      !newPlant.fruitSize ||
      !newPlant.plantingDate ||
      !newPlant.firstHarvest ||
      !newPlant.taste
    ) {
      setError('All fields are required.');
      return;
    }

    const updatedData = [...data, { ...newPlant, id: data.length + 1 }];
    setData(updatedData);
    localStorage.setItem('plants', JSON.stringify(updatedData));
    setNewPlant({
      variety: '',
      height: '',
      fruitSize: '',
      plantingDate: null,
      firstHarvest: null,
      taste: 0,
    });
    setError('');

    // Notify the parent component (App.jsx) that a plant has been added
    onPlantAdded();
  };

  const handleDeletePlant = () => {
    if (!deleteId) {
      setError('Please enter a plant ID.');
      return;
    }

    const updatedData = data.filter((item) => item.id !== parseInt(deleteId, 10));
    if (updatedData.length === data.length) {
      setError('Plant ID not found.');
      return;
    }

    setData(updatedData);
    localStorage.setItem('plants', JSON.stringify(updatedData));
    setDeleteId('');
    setError('');
  };

  const sortedData = orderBy(data, sort);

  return (
    <section id="plants">
      <h2>Your Tomato Plants</h2>
      <Grid
        data={sortedData}
        sortable
        sort={sort}
        onSortChange={(e) => setSort(e.sort)}
        dataItemKey="id"
      >
        <GridColumn field="id" title="Plant Number" />
        <GridColumn field="variety" title="Variety Name" />
        <GridColumn field="height" title="Height (cm)" />
        <GridColumn field="fruitSize" title="Fruit Size (cm)" />
        <GridColumn field="plantingDate" title="Planting Date" />
        <GridColumn field="firstHarvest" title="First Harvest" />
        <GridColumn field="taste" title="Taste Rating" />
      </Grid>

      <h3>Add New Tomato Plant</h3>
      <div className="add-plant-form">
        {error && <Error>{error}</Error>}
        <Input
          name="variety"
          placeholder="Variety Name"
          value={newPlant.variety}
          onChange={handleInputChange}
        />
        <NumericTextBox
          name="height"
          placeholder="Height (cm)"
          value={newPlant.height}
          onChange={(e) => handleDateChange('height', e.value)}
          min={0}
        />
        <NumericTextBox
          name="fruitSize"
          placeholder="Fruit Size (cm)"
          value={newPlant.fruitSize}
          onChange={(e) => handleDateChange('fruitSize', e.value)}
          min={0}
        />
        <DatePicker
          format="dd/MM/yyyy"
          name="plantingDate"
          placeholder="Planting Date"
          value={newPlant.plantingDate}
          onChange={(e) => handleDateChange('plantingDate', e.value)}
        />
        <DatePicker
          format="dd/MM/yyyy"
          name="firstHarvest"
          placeholder="First Harvest"
          value={newPlant.firstHarvest}
          onChange={(e) => handleDateChange('firstHarvest', e.value)}
        />
        <Rating
          name="taste"
          value={newPlant.taste}
          onChange={(e) => handleDateChange('taste', e.value)}
          min={1}
          max={5}
        />
        <Button
          themeColor="primary"
          icon="plus"
          svgIcon={plusIcon}
          onClick={handleAddPlant}
          style={{ backgroundColor: '#0d5039' }}
        >
          Add Plant
        </Button>
      </div>
      <div className="delete-plant-form">
        <h3>Delete Tomato Plant</h3>
        <NumericTextBox
          placeholder="Enter Plant ID"
          value={deleteId}
          onChange={(e) => handleDateChange('deleteId', e.value)}
          min={1}
        />
        <Button
          themeColor="primary"
          icon="trash"
          svgIcon={trashIcon}
          onClick={handleDeletePlant}
        >
          Delete Plant
        </Button>
      </div>
    </section>
  );
};

export default PlantSection;