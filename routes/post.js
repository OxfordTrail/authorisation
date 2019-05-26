const router = require('express').Router();

router.get('/', (req, res)=>{
    res.json({
        post:{
            title: 'My First Post',
            descripton: 'Random data that you shouldnt access'
        }
    });
});

module.exports = router;