import React, { useState } from 'react';

const RegistrationForm = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    profilePicture: null,
  });

  const [familyMembers, setFamilyMembers] = useState([]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', relationship: '', dob: '', gender: '' }]);
  };

  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index][name] = value;
    setFamilyMembers(updatedFamilyMembers);
  };

  const handleRemoveFamilyMember = (index) => {
    const updatedFamilyMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedFamilyMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Personal Info:', personalInfo);
    console.log('Family Members:', familyMembers);
    // In a real application, you would send this data to your backend
  };

  return (
    <div className="container" style={{ display:'flex',flexDirection:'column',margin:'50px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '60vw' }}>
      <h1 className="text-center mb-4">Registration</h1>
        <br></br>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '60vw',width:'60vw', backgroundColor: '#8fc4b7', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={personalInfo.firstName} onChange={handlePersonalInfoChange} required />
        </div>
        {/* ... other personal information fields ... */}
        <div>
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" value={personalInfo.address} onChange={handlePersonalInfoChange} />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input type="file" id="profilePicture" name="profilePicture" onChange={(e) => setPersonalInfo({ ...personalInfo, profilePicture: e.target.files[0] })} />
        </div>

        <h2>Family Details</h2>
        <button type="button" onClick={handleAddFamilyMember}>Add Family Member</button>
        <div id="familyMembersContainer">
          {familyMembers.map((member, index) => (
            <div key={index} className="family-member">
              <h3>Family Member {index + 1}</h3>
              <div>
                <label htmlFor={`familyName${index}`}>Name:</label>
                <input type="text" id={`familyName${index}`} name="name" value={member.name} onChange={(e) => handleFamilyMemberChange(index, e)} />
              </div>
              <div>
                <label htmlFor={`relationship${index}`}>Relationship:</label>
                <input type="text" id={`relationship${index}`} name="relationship" value={member.relationship} onChange={(e) => handleFamilyMemberChange(index, e)} />
              </div>
              {/* ... other family member details ... */}
              <button type="button" onClick={() => handleRemoveFamilyMember(index)}>Remove</button>
            </div>
          ))}
        </div>

        {/* ... other sections ... */}

        <button type="submit">Register / Update Details</button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;