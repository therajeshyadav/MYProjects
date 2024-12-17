const dbPromise=require("../db.js");

// const listing=require("../models/listing");

// module.exports.index=async (req,res)=>{
//     let allListing=await listing.find({});
//     res.render("listings/index.ejs",{allListing});
//   };

// module.exports.renderNewForm=(req,res)=>{
//     res.render("listings/new.ejs");
// };

// module.exports.showListing=async (req,res)=>{
//     let {id}=req.params;
//     let listings=await listing.findById(id)
//     .populate({path:"reviews",populate:{path:"author"}})
//     .populate("owner");
//     // console.log(listings);
//     if(!listings){
//       req.flash("err","Listing you requested for not existed");
//       res.redirect("/listing");
//     }
//     res.render("listings/show.ejs",{listings});
// };

// module.exports.createListing=async (req,res,next)=>{
//     let list=req.body.list;
//    const newlist=new listing(list);
//    newlist.owner=req.user._id;
//    await newlist.save();
//    req.flash("msg","New listing created!");
//    res.redirect("/listing");  
//    };

//  module.exports.renderEditForm=async (req,res)=>{
//     let {id}=req.params;
//     let listings=await listing.findById(id);
//     if(!listings){
//         req.flash("err","Listing you requested for not existed");
//         res.redirect("/listing");
//       }
//     res.render("listings/edit.ejs",{listings});
// };

// module.exports.updateListing=async (req,res)=>{
//     if(!(req.body.list)){
//         throw new ExpressError(400,"send valid data for listing");
//     }
//     let {id}=req.params;
//     await listing.findByIdAndUpdate(id,{...req.body.list});
//    req.flash("msg","listing updated!");
//     res.redirect(`/listing/${id}`);
// };

// module.exports.destroyListing=async (req,res)=>{
//     let {id}=req.params;
//     await listing.findByIdAndDelete(id);
//    req.flash("msg","listing deleted!");
//     res.redirect(`/listing`);
// };


// const Listing = require("../models/listing");

// module.exports.index = async (req, res) => {
//   const [allListing] = await dbPromise.query("SELECT * FROM listings");
//   res.render("listings/index.ejs", { allListing });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };


// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// module.exports.showListing = async (req, res) => {
//   let { id } = req.params;
//   let listing = await Listing.findByPk(id, {
//     include: ["reviews", "owner"]
//   });

//   if (!listing) {
//     req.flash("err", "Listing not found.");
//     return res.redirect("/listing");
//   }
//   res.render("listings/show.ejs", { listing });
// };

// module.exports.createListing = async (req, res) => {
//   let list = req.body.list;
//   const newlist = await Listing.create({
//     ...list,
//     ownerId: req.user.id
//   });
//   req.flash("msg", "New listing created!");
//   res.redirect("/listing");
// };

// module.exports.renderEditForm = async (req, res) => {
//   let { id } = req.params;
//   let listing = await Listing.findByPk(id);

//   if (!listing) {
//     req.flash("err", "Listing not found.");
//     return res.redirect("/listing");
//   }
//   res.render("listings/edit.ejs", { listing });
// };

// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;
//   let updatedData = req.body.list;

//   await Listing.update(updatedData, { where: { id } });
//   req.flash("msg", "Listing updated!");
//   res.redirect(`/listing/${id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//   let { id } = req.params;
//   await Listing.destroy({ where: { id } });
//   req.flash("msg", "Listing deleted!");
//   res.redirect("/listing");
// };



module.exports.index = async (req, res) => {
  const [allListing] = await dbPromise.query("SELECT * FROM listings");
  res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  
  const [listing] = await dbPromise.query(`
    SELECT * 
    FROM listings 
    WHERE id = ?`, 
    [id]
  );

  if (listing.length === 0) {
    req.flash("err", "Listing not found.");
    return res.redirect("/listing");
  }
  
  res.render("listings/show.ejs", { listings: listing[0] });
};

module.exports.createListing = async (req, res) => {
  let list = req.body.list;

  await dbPromise.query(`
    INSERT INTO listings (title, description,image, price, location,country) 
    VALUES (?, ?, ?, ?, ?, ?)`, 
    [list.title, list.description,list.image, list.price,list.location,list.country]
  );
  

  res.redirect("/listing");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;

  const [listing] = await dbPromise.query("SELECT * FROM listings WHERE id = ?", [id]);

  if (listing.length === 0) {
    req.flash("err", "Listing not found.");
    return res.redirect("/listing");
  }

  res.render("listings/edit.ejs", { listings: listing[0] });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let updatedData = req.body.list;

  await dbPromise.query(`
    UPDATE listings 
    SET title = ?, description = ?, image=?, price = ? , country =? , location =?
    WHERE id = ?`, 
    [updatedData.title, updatedData.description, updatedData.image, updatedData.price, updatedData.country, updatedData.location, id]
  );
  
  res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;

  await dbPromise.query("DELETE FROM listings WHERE id = ?", [id]);
  
  
  res.redirect("/listing");
};
