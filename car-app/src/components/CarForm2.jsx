import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropzone from "react-dropzone";

const carMakes = ["Toyota", "Honda", "Maruti"];
const carModels = {
  Toyota: ["Innova", "Fortuner", "Etios"],
  Honda: ["City", "Jazz", "Civic"],
  Maruti: ["Swift", "Ritz", "Brezza"]
};

const CarForm2 = () => {
  const [carData, setCarData] = useState([
    { make: "", model: "", year: null, value: "" }
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("carData");
    if (storedData) {
      setCarData(JSON.parse(storedData));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("carData", JSON.stringify(carData));
  }, [carData]);

  const handleCarDataChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...carData];
    list[index][name] = value;
    setCarData(list);
  };

  const handleAddCar = () => {
    setCarData(carData => [
      ...carData,
      { make: "", model: "", year: null, value: "" }
    ]);
  };

  const handleRemoveCar = index => {
    const list = [...carData];
    list.splice(index, 1);
    setCarData(list);
  };

  const onSubmit = data => {
    console.log(data);
    localStorage.setItem();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {carData.map((car, index) => (
        <div key={index}>
          <h2>Car {index + 1}</h2>
          <div>
            <label htmlFor={`make${index}`}>Make</label>
            <select
              name={`make${index}`}
              id={`make${index}`}
              onChange={e => handleCarDataChange(index, e)}
              ref={register({ required: true })}
            >
              <option value="">Select a make</option>
              {carMakes.map(make => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
            {errors[`make${index}`] && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor={`model${index}`}>Model</label>
            <select
              name={`model${index}`}
              id={`model${index}`}
              value={car.model}
              onChange={e => handleCarDataChange(index, e)}
              disabled={!car.make}
              ref={register({ required: true })}
            >
              <option value="">Select a model</option>
              {carModels[car.make]?.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            {errors[`model${index}`] && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor={`year${index}`}>Year</label>
            <DatePicker
              name={`year${index}`}
              id={`year${index}`}
              selected={car.year}
              onChange={date =>
                handleCarDataChange(index, {
                  target: { name: "year", value: date }
                })
              }
              showYearPicker
              dateFormat="yyyy"
              ref={register({ required: true })}
            />
            {errors[`year${index}`] && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor={`value${index}`}>Value</label>
            <input
              type="text"
              name={`value${index}`}
              id={`value${index}`}
              value={car.value}
              onChange={e => handleCarDataChange(index, e)}
              ref={register({ required: true, pattern: /^\d+$/ })}
            />
            {errors[`value${index}`] && (
              <span>
                This field is required and should only contain numbers
              </span>
            )}
          </div>
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveCar(index)}>
              Remove Car
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddCar}>
        Add Car
      </button>
      <div>
        <Dropzone
          onDrop={acceptedFiles => console.log(acceptedFiles)}
          accept=".pdf"
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop a PDF file here, or click to select a file</p>
            </div>
          )}
        </Dropzone>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CarForm2;
