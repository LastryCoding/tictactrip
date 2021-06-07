// Implemention of CRUD requests 

// Create
exports.create = async (Type, data) => {
  let response = {};
  var newType = new Type({ ...data });
  await newType
    .save()
    .then(() => {
      response.status = 201;
      response.id = newType._id;
      response.message = `document ${newType._id} created successfully`;
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return { ...response };
};
// Read All
exports.readAll = async (Type) => {
  let response = {};
  const result = await Type.find({});
  if (result) {
    response.status = 200;
    response.message = result;
  } else {
    response.status = 500;
    response.message = "error database";
  }
  return { ...response };
};
// Update
exports.updateOne = async (Type, id, data) => {
  let response = {};
  const result = await Type.findOneAndUpdate({ _id: id }, { $set: { ...data } });
  if (result) {
    response.status = 201;
    response.message = "Document updated";
  } else {
    response.status = 400;
    response.message = "No such document";
  }
  return { ...response };
};
// Read One
exports.readOne = async (Type, id) => {
  let response = {};
  const result = await Type.findOne({ _id: id });
  if (result) {
    response.status = 200;
    response.message = result;
  } else {
    response.status = 400;
    response.message = "No such document";
  }
  return { ...response };
};
// Delete One
exports.deleteOne = async (Type, id) => {
  let response = {};
  const result = await Type.findOneAndDelete({ _id: id });
  if (result) {
    response.status = 200;
    response.message = "Document deleted";
  } else {
    response.status = 400;
    response.message = "No such document";
  }
  return { ...response };
};

// Specific request

// Read One by Email
exports.readOneByEmail = async (Type, email) => {
  let response = {};
  const result = await Type.findOne({ email });
  if (result) {
    response.status = 200;
    response.message = result;
  } else {
    response.status = 400;
    response.message = "No such document";
  }
  return { ...response };
};
