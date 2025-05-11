import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DevoteeUpdation = () => {
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [devoteeData, setDevoteeData] = useState(null); // To store fetched devotee data
  const [loading, setLoading] = useState(true); // Add loading state

  const { fields, append, remove } = useFieldArray({ name: 'familyMembers', control });

  const handleAddFamilyMember = () => append({ name: '', relationship: '' });

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
    setValue('dateOfBirth', date);
  };

  // Fetch devotee data on component mount (replace with your actual API endpoint)
  useEffect(() => {
    const fetchDevoteeData = async () => {
      try {
        //  replace 'devoteeId'  with how you access it (e.g., from URL params, a global state)
        const devoteeId = '123';
        const response = await fetch(`http://localhost:8081/api/v1/devotee/${devoteeId}`); //  API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch devotee data: ${response.status}`);
        }
        const data = await response.json();
        setDevoteeData(data);
        // Populate the form with fetched data
        setValue('fname', data.fname);
        setValue('lname', data.lname);
        const dob = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
        setDateOfBirth(dob);
        setValue('dateOfBirth', dob);
        setValue('gender', data.gender);
        setValue('addresshouseno', data.addresshouseno);
        setValue('locality', data.locality);
        setValue('city', data.city);
        setValue('district', data.district);
        setValue('state', data.state);
        setValue('pincode', data.pincode);
        setValue('contact', data.contact);
        setValue('email', data.email);

        // Populate family members.  Make sure backend returns familyMembers as an array.
        if (data.familyMembers && Array.isArray(data.familyMembers)) {
          data.familyMembers.forEach((member, index) => {
            if (index >= fields.length) {
              append({ name: member.name, relationship: member.relationship });
            } else {
              setValue(`familyMembers.${index}.name`, member.name);
              setValue(`familyMembers.${index}.relationship`, member.relationship);
            }
          });
        }

        setLoading(false);
      } catch {
          setUpdateError('An error occurred while fetching devotee data.');
          setLoading(false);
      }
    };

    fetchDevoteeData();
  }, [setValue, append, fields.length]); //  dependencies

  const onSubmit = async (data) => {
    setUpdateSuccess(false);
    setUpdateError('');

    try {
      //  replace 'devoteeId'  with how you access it
      const devoteeId = '123';
      const response = await fetch(`http://localhost:8081/api/v1/devotee/${devoteeId}`, { //  API endpoint
        method: 'PUT', // Use PUT for updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setUpdateSuccess(true);
        //  Do NOT reset the entire form on successful update.  Provide user feedback.
        // reset();
      } else {
        const errorData = await response.json();
        setUpdateError(errorData?.message || 'Failed to update devotee data on the server.');
      }
    } catch {
      setUpdateError('Failed to connect to the server.');
    }
  };

  if (loading) {
    return <div className="container my-5">Loading devotee data...</div>; // Show loading message
  }

  if (updateError) {
    return <div className="container my-5 alert alert-danger">Error: {updateError}</div>;
  }

  if (!devoteeData) {
    return <div className="container my-5">Devotee data not found.</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 text-primary">📝 Devotee Updation Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* PERSONAL DETAILS */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input className="form-control" {...register('fname', { required: 'First name is required' })} />
              {errors.fname && <small className="text-danger">{errors.fname.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input className="form-control" {...register('lname', { required: 'Last name is required' })} />
              {errors.lname && <small className="text-danger">{errors.lname.message}</small>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <DatePicker
                selected={dateOfBirth}
                onChange={handleDateOfBirthChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Select your birth date"
              />
              {errors.dateOfBirth && <small className="text-danger">{errors.dateOfBirth.message}</small>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <div>
                {['male', 'female', 'other'].map(gender => (
                  <div className="form-check form-check-inline" key={gender}>
                    <input
                      className="form-check-input"
                      type="radio"
                      value={gender}
                      {...register('gender', { required: 'Select your gender' })}
                    />
                    <label className="form-check-label text-capitalize">{gender}</label>
                  </div>
                ))}
              </div>
              {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
            </div>
          </div>

          {/* ADDRESS */}
          <h4 className="border-bottom mb-3 mt-4">📍 Address</h4>
          <div className="row">
            {[
              { id: 'addresshouseno', label: 'House No / Street' },
              { id: 'locality', label: 'Locality / Area' },
              { id: 'city', label: 'City' },
              { id: 'district', label: 'District' },
              { id: 'state', label: 'State' },
              { id: 'pincode', label: 'Pincode', pattern: /^[1-9][0-9]{5}$/ }
            ].map(({ id, label, pattern }) => (
              <div className="col-md-6 mb-3" key={id}>
                <label className="form-label">{label}</label>
                <input
                  className="form-control"
                  {...register(id, {
                    required: `${label} is required`,
                    ...(pattern && {
                      pattern: {
                        value: pattern,
                        message: `Invalid ${label.toLowerCase()}`
                      }
                    })
                  })}
                />
                {errors[id] && <small className="text-danger">{errors[id].message}</small>}
              </div>
            ))}
          </div>

          {/* CONTACT */}
          <h4 className="border-bottom mb-3 mt-4">📞 Contact Info</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                {...register('contact', {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
              />
              {errors.contact && <small className="text-danger">{errors.contact.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>
          </div>

          {/* FAMILY MEMBERS */}
          <h4 className="border-bottom mb-3 mt-4">👨‍👩‍👧 Family Members</h4>
          <div className="mb-3">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddFamilyMember}>
              ➕ Add Member
            </button>
          </div>

          {fields.map((item, index) => (
            <div key={item.id} className="card mb-3 p-3 bg-light">
              <h5>Family Member {index + 1}</h5>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    {...register(`familyMembers.${index}.name`, { required: 'Name is required' })}
                  />
                  {errors.familyMembers?.[index]?.name && (
                    <small className="text-danger">{errors.familyMembers[index].name.message}</small>
                  )}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Relationship</label>
                  <input
                    className="form-control"
                    {...register(`familyMembers.${index}.relationship`, { required: 'Relationship is required' })}
                  />
                  {errors.familyMembers?.[index]?.relationship && (
                    <small className="text-danger">{errors.familyMembers[index].relationship.message}</small>
                  )}
                </div>
              </div>
              <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => remove(index)}>
                🗑️ Remove
              </button>
            </div>
          ))}

          {/* SUBMIT */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-4 py-2">
              ✅ Update Devotee
            </button>
          </div>

          {updateSuccess && <div className="alert alert-success mt-3">🎉 Devotee data updated successfully!</div>}
          {updateError && <div className="alert alert-danger mt-3">{updateError}</div>}
        </form>
      </div>
    </div>
  );
};

export default DevoteeUpdation;
