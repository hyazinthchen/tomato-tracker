import React, { useState } from 'react';
import { orderBy } from '@progress/kendo-data-query';
import PlantGrid from '../PlantGrid/PlantGrid';
import AddPlantForm from '../AddPlantForm/AddPlantForm';
import DeletePlantForm from '../DeletePlantForm/DeletePlantForm';
import './plantSection.css';

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const calculateGrowthPeriod = (plantingDate, firstHarvest) => {
  if (!plantingDate || !firstHarvest) return 0;
  const planting = new Date(plantingDate);
  const harvest = new Date(firstHarvest);
  const timeDiff = harvest.getTime() - planting.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

const PlantSection = ({ onPlantAdded }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('plants');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.map((plant) => ({
        ...plant,
        formattedPlantingDate: formatDate(plant.plantingDate),
        formattedFirstHarvest: formatDate(plant.firstHarvest),
        growthPeriod: calculateGrowthPeriod(
          plant.plantingDate,
          plant.firstHarvest
        ),
      }));
    }
    return [];
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
  const [addPlantError, setAddPlantError] = useState('');
  const [deletePlantError, setDeletePlantError] = useState('');
  const [sort, setSort] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlant({ ...newPlant, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setNewPlant({ ...newPlant, [name]: value });
  };

  const handleDeleteIdChange = (value) => {
    setDeleteId(value);
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
      setAddPlantError('All fields are required.');
      return;
    }

    const nextId =
      data.length > 0 ? Math.max(...data.map((plant) => plant.id)) + 1 : 1;

    const growthPeriod = calculateGrowthPeriod(
      newPlant.plantingDate,
      newPlant.firstHarvest
    );

    const formattedPlant = {
      ...newPlant,
      id: nextId,
      formattedPlantingDate: formatDate(newPlant.plantingDate),
      formattedFirstHarvest: formatDate(newPlant.firstHarvest),
      growthPeriod,
    };

    const updatedData = [...data, formattedPlant];
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
    setAddPlantError('');
    onPlantAdded(updatedData);
  };

  const handleDeletePlant = () => {
    if (!deleteId) {
      setDeletePlantError('Please enter a plant ID.');
      return;
    }

    const updatedData = data.filter(
      (item) => item.id !== parseInt(deleteId, 10)
    );
    if (updatedData.length === data.length) {
      setDeletePlantError('Plant ID not found.');
      return;
    }

    setData(updatedData);
    localStorage.setItem('plants', JSON.stringify(updatedData));
    setDeleteId('');
    setDeletePlantError('');
  };

  const handleSortChange = (e) => {
    const newSort = e.sort;

    if (newSort.length > 0) {
      const sortField = newSort[0].field;
      if (sortField === 'formattedPlantingDate') {
        newSort[0].field = 'plantingDate';
      } else if (sortField === 'formattedFirstHarvest') {
        newSort[0].field = 'firstHarvest';
      }
    }

    setSort(newSort);
  };

  const filteredData = data.filter((plant) =>
    Object.values(plant).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = orderBy(filteredData, sort);

  return (
    <section className='plant-section'>
      <PlantGrid
        data={sortedData}
        sort={sort}
        onSortChange={handleSortChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className='form-wrapper'>
        <AddPlantForm
          newPlant={newPlant}
          error={addPlantError}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleAddPlant={handleAddPlant}
        />

        <DeletePlantForm
          deleteId={deleteId}
          error={deletePlantError}
          handleDeleteIdChange={handleDeleteIdChange}
          handleDeletePlant={handleDeletePlant}
        />
      </div>
    </section>
  );
};

export default PlantSection;
