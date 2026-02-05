
const emp=require("../../models/emp_schema.js")


exports.getAll=async (req, res) => {                    // To retreive all the employess
    try{
        const employees = await emp.find()
        res.status(200).json(employees)
    }catch(err) {
            res.status(500).json(err.message)
        }
}

exports.getById=async (req, res) => {                  // To retreive an employee by ObjectID
    try{ 
        const ID=req.params.id
        const employ= await emp.findById(ID)
        res.status(200).json(employ)
        }catch(err) {
            res.status(500).json(err.message)
        }
}

exports.addNew=async (req,res)=>{                      // To create a new employee
    try{
        const empdata=new emp(req.body)
        const result= await empdata.save()
        res.status(200).send(result)
    }catch(err){
        res.send(err.message)
    }
}

exports.deleteById=async (req,res)=>{                  // To delete existing employee by ObjectID
    try{
        const ID=req.params.id
        const result = await emp.deleteOne({_id:ID})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err.message)
    }
}


exports.editById=async (req,res)=>{                    // modify existing employee by objectID
    try{
        const ID=req.params.id
        const empdata= req.body
        const result= await emp.findByIdAndUpdate(
        ID,
        empdata,
        {
            new:true,
            runValidators:true
        }   
    )
    res.status(200).json(result)
    }catch(err){
        res.status(500).json(err.message)
    }
}


