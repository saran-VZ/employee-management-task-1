

const express=require("express")
const router=express.Router()

const emp=require("/home/saran-st/Documents/task1-emp/models/emp_schema.js")

router.use(express.urlencoded({extended:true})) 
router.use(express.json()) 


router.get("/", (req, res) => {                    // To retreive all the employess
    emp.find()
        .then(emps => {
            res.status(200).json(emps)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

router.get("/:id", (req, res) => {                // To retreive an employee by ObjectID
    const ID=req.params.id
    emp.findById(ID)
        .then(emps => {
            res.status(200).json(emps)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

router.post("/",(req,res)=>{                       // To create a new employee
    const empdata=new emp(req.body)
    console.log(req.body)
    empdata.save()
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{
        res.send(err.message)
    })
})

router.delete("/:id",(req,res)=>{                 // To delete existing employee by ObjectID
    const ID=req.params.id
    emp.deleteOne({_id:ID})
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json(err.message)
    })
})


router.put("/:id",(req,res)=>{                    // To modify existing employee by objectID
    const ID=req.params.id
    const empdata= req.body
    emp.findByIdAndUpdate(
        ID,
        empdata,
        {
            new:true,
            runValidators:true
        }   
    )
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json(err.message)
    })
})


module.exports=router