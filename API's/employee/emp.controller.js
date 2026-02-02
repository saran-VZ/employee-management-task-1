const express=require("express")
const router=express.Router()

const emp=require("/home/saran-st/Documents/task1-emp/models/emp_schema.js")

router.use(express.urlencoded({extended:true})) 
router.use(express.json()) 
router.use(express.static("./public"))  


router.get("/", async (req, res) => {                    // To retreive all the employess
    try{
        const employees = await emp.find()
        res.status(200).json(employees)
    }catch(err) {
            res.status(500).json(err.message)
        }
})

router.get("/:id", async (req, res) => {                // To retreive an employee by ObjectID
    try{ const ID=req.params.id
         const employ= await emp.findById(ID)
         res.status(200).json(employ)
        }catch(err) {
            res.status(500).json(err.message)
        }
})

router.post("/",async (req,res)=>{                       // To create a new employee
    try{
        const empdata=new emp(req.body)
        const result= await empdata.save()
        res.status(200).send(result)
    }catch(err){
        res.send(err.message)
    }
})

router.delete("/:id",async (req,res)=>{                 // To delete existing employee by ObjectID
    try{
        const ID=req.params.id
        const result = await emp.deleteOne({_id:ID})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err.message)
    }
})


router.put("/:id",async (req,res)=>{                    // modify existing employee by objectID
    try{const ID=req.params.id
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
})


module.exports=router