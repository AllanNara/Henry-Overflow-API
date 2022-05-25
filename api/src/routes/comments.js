require('dotenv').config();
const { Router } = require('express');
const { updateComment, deleteComment } = require('../controllers/Comment');
const router = Router();
const { Comment, Post, User } = require('../db')

// El usuario hace una pregunta que se ancla a su ID USER
// Otro usuario envia una respuesta para la misma, que se relaciona con:
// ID POST ---> SABER A QUE POST PERTENECE
// ID USER ---> SABER QUE USUARIO HIZO ESE COMENTARIO
router.put('/:id',updateComment );
router.delete('/:id', deleteComment);
/* 
Entonces extraigo el ID del post por params, y de alli saco el
post del que pertenece y desde el post al que pertenece tambien saco el usuario
Alli mismo hago la relacion con estas dos entidades(POST Y USER) asi queda guardada esta informacion
Devuelvo el mensaje para verificar
*/
router.post('/:idPost', async(req, res, next) => {
    const { idPost } = req.params
    try {
        const createdInPost = await Post.findByPk(idPost, { include: [User] })

        let idUser = createdInPost.toJSON().user.id
        const createdBy = await User.findByPk(idUser)

        const newComment = await Comment.create(req.body);
        createdBy.addComment(newComment)
        createdInPost.addComment(newComment)
        res.send("Comentario enviado con exito")
    } catch (error) {
        next(error)
    }
});

module.exports = router