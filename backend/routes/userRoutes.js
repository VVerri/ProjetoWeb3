const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyAdm = require

/*
// Read -  Leitura de dados
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})
*/


/*
// Update - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const { name, celphone, approved } = req.body

    const user = {
        name,
        celphone,
        approved
    }

    try {
        const updatedUser = await User.updateOne({_id:id}, user)

        if(updatedUser.matchedCount === 0){
            res.status(422).json({ message: 'O usuário não foi encontrado! '})
            return
        }

        res.status(200).json(user)


    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

// Delete - Deletar dados

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ _id: id})

    if(!user){
        res.status(422).json({ message: 'O usuário não foi encontrado! '})
        return
    }

    try {
        await User.deleteOne({ _id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso'})


    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})
*/

module.exports = router