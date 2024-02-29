import React, { useMemo, useState } from 'react';
import '../styles/setyourvehicle.css';

export default function SetYourVehicle() {
    const [year, setYear] = useState('');
    const [disablemake, setDisableMake] = useState(true);
    const [make, setMake] = useState('');
    const [makes, setMakes] = useState([]);
    const [disablemodel, setDisableModel] = useState(true);
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
    const [disabledEngine, setDisabledEngine] = useState(true);
    

    const handleYearChange = (event) => {
        setYear(event.target.value);
        if(event.target.value !== ''){
            fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json')
                .then(response => response.json())
                .then(data => {
                    const makes = data.Results.map(make => make.Make_Name);
                    setMakes(makes);
                    setDisableMake(false);
                })
                .catch(error => {
                    console.error('Error al obtener las marcas de vehículos:', error);
                });
        }else{
            setDisableMake(true);
        }
      };

      const handleMakeChange = (event) => {
        setMake(event.target.value);
        if(event.target.value !== ''){
            fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${event.target.value}?format=json`)
                .then(response => response.json())
                .then(data => {
                    const models = data.Results.map(model => model.Model_Name);
                    setModels(models);
                    setDisableModel(false);
                })
                .catch(error => {
                    console.error('Error al obtener las marcas de vehículos:', error);
                });
        }else{
            setDisableModel(true);
        }
      }

      const makeMemo = useMemo(() => {
        return makes.map((make, index) => (
            <option key={index} value={make}>{make}</option>
            ));
      }, [makes]);
    
      const handleModelChange = (event) => {
        setModel(event.target.value);
        if(event.target.value !== ''){
            setDisabledEngine(false);
        }else{
            setDisabledEngine(true);
        }
      }

      const yearOptions = [];
      for (let year = 1995; year <= 2023; year++) {
        yearOptions.push(
          <option key={year} value={year}>
            {year}
          </option>
        );
      }

  return (
    <div className='searcher-box'>
      <div className='info'>
        <div><b>SET YOUR VEHICLE</b></div>
        Get an exact fir for<br/> your vehicle.
      </div>
    <select className='searcher-select' onChange={handleYearChange}>
        <option value=""> 1 | Year </option>
        {yearOptions}
    </select>
      <select className='searcher-select' disabled={disablemake} onChange={handleMakeChange}>
        <option value=""> 2 | Make </option>
        {makeMemo}
      </select>
      <select className='searcher-select' disabled={disablemodel} onChange={handleModelChange}>
        <option value=""> 3 | Model </option>
        {models.map((model, index) => (
            <option key={index} value={model}>{model}</option>
        ))}
      </select>
      <select className='searcher-select' disabled={disabledEngine}>
      <option >4 | Engine</option>
      </select>
    </div>
  )
}
