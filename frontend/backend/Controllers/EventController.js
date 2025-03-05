const EventModels = require('../Models/EventModels');  

const createEvent=async(req,res)=>{
   try{
    const body = req.body;
    body.profileImage = req?.file ? req.file?.path : null;
    console.log(body);
    const evt=new EventModels(body);
    await evt.save();
    res.status(201)
    .json({
        message:"Event Created",
        success:true,
    })

   }catch(err){
    res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        error: err
    })
   }
}

const updateEventById = async (req, res) => {
    try {
      const { name, phone, email, salary, department } = req.body;
      const { id } = req.params;
  
      let updateData = {
        name,
        phone,
        email,
        salary,
        department,
        updatedAt: new Date(), 
      };
  
      if (req.file) {
        updateData.profileImage = req.file.path; 
      }
  
      const updateEvent = await EventModels.findByIdAndUpdate(
        id,
        updateData,
        { new: true } 
      );
  
      if (!updateEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.status(200).json({
        message: 'Event Updated',
        success: true,
        data: updateEvent,
      });
    } catch (err) {
      console.error(err); 
      res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        error: err.message, 
      });
    }
  };
  


const getAllEvents=async(req,res)=>{
    try{
        let {page,limit,search}=req.query;

        page=parseInt(page)||1;
        limit=parseInt(limit)||5;

        const skip=(page-1)*limit;

        let searchCriteria={};
        if(search){
            searchCriteria={
                name:{
                    $regex:search,
                    $options:'i'
                }
            }
        }
        const totalEvents=await EventModels.countDocuments(searchCriteria);
     
     const evts=await EventModels.find(searchCriteria)
     .skip(skip)
     .limit(limit)
     .sort({updatedAt: -1});

     const totalPages=Math.ceil(totalEvents/limit);


     res.status(200)
     .json({
         message:"All Events",
         success:true,
         data:{
            events:evts,
            pagination:{
                totalEvents,
                currentPage:page,
                totalPages,
                pageSize:limit
            }
         }
     })
 
    }catch(err){
        console.log(err);
     res.status(500).json({
         message: 'Internal Server Error',
         success: false,
         error: err
     })
    }
 }

 const getEventById=async(req,res)=>{
    try{
        const {id}=req.params;
     
     const evt=await EventModels.findOne({_id:id});
     res.status(200)
     .json({
         message:"Get Events Details",
         success:true,
         data:evt
     })
 
    }catch(err){
     res.status(500).json({
         message: 'Internal Server Error',
         success: false,
         error: err
     })
    }
 }

 const deleteEventById=async(req,res)=>{
    try{
        const {id}=req.params;
     
     const evt=await EventModels.findByIdAndDelete({_id:id});
     res.status(200)
     .json({
         message:"Event Deleted",
         success:true
     })
 
    }catch(err){
     res.status(500).json({
         message: 'Internal Server Error',
         success: false,
         error: err
     })
    }
 }
module.exports={
    createEvent,getAllEvents,getEventById,deleteEventById,updateEventById
}