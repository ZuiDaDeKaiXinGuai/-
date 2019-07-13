var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDB = require('mongodb-curd');
var dbBase = '1610A';
var dbColl = 'userinfo';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "Express" })
})

router.post('/api/add', function(req, res, next) {
    var parmes = req.body;
    name = parmes.name,
        age = parmes.age,
        phone = parmes.phone,
        address = parmes.address,
        card = parmes.card,
        id = parmes.id;
    if (id) { //更新
        delete parmes.id;
        mongoDB.update(dbBase, dbColl, [{ _id: id }, parmes], function(result) {
            console.log(result)
            if (result) {
                res.send({ code: '0', mes: "修改成功" })
            } else {
                res.send({ code: '1', mes: '修改失败' })
            }
        })
    } else { //添加
        if (!card || !name) {
            res.send({ code: 0, mes: "用户名和身份证不能为空" });
        } else {
            mongoDB.find(dbBase, dbColl, { card: card }, function(result) {
                if (result.length > 0) {
                    res.send({ code: '3', mes: "该用户已存在" });
                } else {
                    mongoDB.insert(dbBase, dbColl, parmes, function(result) {
                        res.send({ code: 1, mes: "用户添加成功" });
                    })
                }
            })
        }
    }
})

router.get('/api/del', function(req, res, next) {
    var id = req.query.id;
    mongoDB.remove(dbBase, dbColl, { _id: id }, function(result) {
        if (result.deletedCount == 1) {
            res.send({ code: '0', mes: "删除成功" });
        } else {
            res.send({ code: '1', mes: "删除失败" });
        }
    })
})

router.get('/api/detail', function(req, res, next) {
    var id = req.query.id;
    mongoDB.find(dbBase, dbColl, { _id: id }, function(result) {
        if (result.length > 0) {
            res.send({ code: '0', mes: result })
        } else {
            res.send({ code: '1', mes: '用户不存在' });
        }
    })
})

// router.post('/api/update', function(req, res, next) {
//     var parmes = req.body;
//     var name = parmes.name,
//         age = parmes.age,
//         phone = parmes.phone,
//         address = parmes.address,
//         card = parmes.card,
//         id = parmes.id;
//     delete parmes.id;
//     mongoDB.update(dbBase, dbColl, [{ _id: id },  parmes ], function(result) {
//         console.log(result)
//         if (result) {
//             res.send({ code: '0', mes: "修改成功" })
//         } else {
//             res.send({ code: '1', mes: '修改失败' })
//         }
//     })
// })

router.get('/api/list', function(req, res, next) {
    mongoDB.find(dbBase, dbColl, function(result) {
        if (result) {
            res.send({ code: 0, mes: result })
        } else {
            res.send({ code: 1, mes: "没有数据" })
        }
    })
})
module.exports = router;