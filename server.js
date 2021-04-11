const experss = require('express');
const bodyParser = require('body-parser');
const path = require('path')
let app = experss();
const multer = require('multer')
app.use('/uploads', experss.static(path.join(__dirname, 'uploads')))
// 上传设置
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) //更改名字
        //        原名(不含后缀)   -      时间                后缀     
    }
})
//按照规则绑定到upload上
let upload = multer({
    storage: storage
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))


// 数据库线程池设置
let OptPool = require('./model/OptPool.js');
const {
    title
} = require('process');
let optpool = new OptPool();
let pool = optpool.getPool();


// 跨域
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //允许所有源
    res.header('Access-Control-Allow-Methods', 'OPTIONS,PATCH,PUT,GET,POST,DELETE'); //复杂请求 , 简单请求
    res.header('Access-Control-Allow-Headers', 'Content-type,authorization'); //添加请求头
    res.header('Access-Control-Allow-Credentials', true); // 是否可以将请求的响应暴露给页面
    next();
})

// 登录
app.post('/authorizations', (req, res) => {
    let {
        mobile,
        code
    } = req.body;
    // console.log(mobile,code);
    if (code === '123456') {
        // console.log(123);
        pool.getConnection(function (err, conn) {
            let sql = `select * from user where mobile=${mobile}`;
            conn.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    // console.log(result);
                    if (result.length !== 0) {
                        res.json({
                            message: "OK",
                            data: {
                                id: result[0].id,
                                name: result[0].name,
                                mobile: result[0].mobile,
                                token: result[0].token,
                                photo: result[0].photo,
                                intro: result[0].intro,
                                email: result[0].email
                            }
                        })
                    } else {
                        res.status(990).json({
                            message: '无此用户,请注册'
                        })
                    }
                }
            })
        })
    } else {
        res.status(999).json({
            message: '验证码错误'
        })
    }
})
//注册
app.post('/register', (req, res) => {
    // 随机生成token17
    const randomStr = (len) => {
        let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = '';
        while (len) {
            let index = Math.floor(Math.random() * str.length);
            result += str[index];
            len--;
        }
        return result
    }
    let {
        name,
        mobile,
        code
    } = req.body;
    // console.log(name,mobile,code);
    let token = randomStr(17);
    // console.log(token);
    if (code === '123456') {
        pool.getConnection(function (err, conn) {
            let sql = `insert into user (mobile,name,token) value (${mobile},'${name}','${token}');select * from user where mobile=${mobile}`;
            conn.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        message: '添加成功',
                        data: {
                            token: result[1][0].token
                        }
                    })
                    // console.log(result[1][0].token);
                }
                conn.release();
            })

        })
    } else {
        res.status(999).json({
            message: "非法访问"
        });
    }
})
//首页
app.get('/user/profile', (req, res) => {
    let Bearer = req.headers.authorization;
    if (Bearer) {
        let token = Bearer.substring(7);
        // console.log(token);
        pool.getConnection(function (err, conn) {
            let sql = `select * from user where token="${token}"`;
            conn.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    // console.log(result);
                    res.json({
                        message: "OK",
                        data: {
                            id: result[0].id,
                            name: result[0].name,
                            photo: result[0].photo,
                            mobile: result[0].mobile,
                            email: result[0].email,
                            intro: result[0].intro
                        }
                    })
                }
                conn.release();
            })
        })
    }
})

//评论管理
app.get('/comments', (req, res) => {
    // console.log(req.query);
    let query = req.query;
    let page = query.page;
    let per_page = query.per_page;
    let response_type = query.response_type;
    // console.log(page,per_page,response_type);
    // 数据起点
    let start = (page - 1) * per_page;
    if (response_type === 'comment' && per_page === '4') {
        pool.getConnection(function (err, conn) {
            let sql = `select count(*) from comment;select * from comment limit ${start},${per_page}`
            conn.query(sql, (err, result) => {
                if (err) {
                    // console.log(111);
                    res.json(err);
                } else {
                    // console.log(222);
                    // console.log(result);
                    let total_count = result[0][0]['count(*)'];
                    res.json({
                        message: "OK",
                        'total_count': total_count,
                        'page': page,
                        'per_page': per_page,
                        "results": result[1]
                    })
                }
                conn.release();
            })
        })
    }

})

// 评论状态
app.put('/comments/status', (req, res) => {
    let id = req.query.article_id;
    let status = req.body.allow_comment;
    // console.log(id,status);
    pool.getConnection(function (err, conn) {
        let sql = `update comment set comment_status=${status} where id=${id}`
        conn.query(sql, (err, result) => {
            if (err) {
                res.json(err)
            } else {
                res.json({
                    message: "ok"
                })
            }
        })
    })
})

// 上传图片
app.post('/user/images', upload.single('image'), (req, res) => {
    let imgPath = req.file.path.replace('\\', '/');
    // console.log(imgPath);
    pool.getConnection(function (err, conn) {
        let sql = `insert into material (url) values ('http://localhost:3031/${imgPath}')`;
        conn.query(sql, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    message: "OK",
                    data: {
                        id: result.insertId,
                        http: `http://localhost:3031/${imgPath}`
                    }
                })
            }
        })
    })
})
// 获取素材信息
app.get('/user/getImages', (req, res) => {
    let query = req.query;
    let page = query.page;
    let per_page = query.per_page
    let collect = eval(query.collect.toLowerCase()) ? 1 : 0;
    // console.log(page,per_page,collect);
    let start = (page - 1) * per_page;
    if (per_page === '2') {
        pool.getConnection(function (err, conn) {
            let sql = '';
            if (collect) {
                sql = `select count(*) from material where is_collected=${collect};select * from material where is_collected=${collect} order by id desc limit ${start},${per_page}`;
            } else {
                sql = `select count(*) from material;select * from material  order by id desc limit ${start},${per_page}`;
            }
            conn.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    // console.log(result);
                    let total_count = result[0][0]['count(*)'];
                    res.json({
                        message: 'OK',
                        data: {
                            'total_count': total_count,
                            'page': page,
                            'per_page': per_page,
                            'results': result[1]
                        }
                    })
                }
            })
        })
    }
})

// 收藏素材
app.put('/user/images/:target', (req, res) => {
    let target = req.params.target;
    // console.log(target);
    let collect = req.body.collect ? 1 : 0;
    pool.getConnection(function (err, conn) {
        let sql = `update material set is_collected=${collect} where id=${target}`;
        conn.query(sql, (err, result) => {
            if (err) {
                res.json(err)
            } else {
                res.json({
                    message: "OK"
                });
            }
            conn.release();
        })
    })
})
// 删除素材
app.delete('/user/images/:target', (req, res) => {
    let target = req.params.target;
    // console.log(target);
    pool.getConnection(function (err, conn) {
        let sql = `delete from material where id=${target}`;
        conn.query(sql, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    message: "OK"
                })
            }
        })
    })
})
// 上传头像
app.patch('/user/photo', upload.single('photo'), (req, res) => {
    let imgPath = req.file.path.replace("\\", "/");
    // console.log(imgPath);
    pool.getConnection(function (err, conn) {
        let sql = `update user set photo='http://localhost:3031/${imgPath}' where id=1`;
        conn.query(sql, (err, result) => {
            if (err) {
                res.json(err)
            } else {
                res.json({
                    message: "图片上传成功"
                })
            }
        })
    })
})

//更改用户信息
app.patch('/user/profile', (req, res) => {
    let Bearer = req.headers.authorization;
    if (Bearer) {
        let token = Bearer.substring(7);
        let {
            id,
            mobile,
            email,
            intro,
            name
        } = req.body;
        pool.getConnection((err, conn) => {
            let sql = `update user set name='${name}',intro='${intro}',mobile='${mobile}',email='${email}' where token='${token}'`
            conn.query(sql, (err, result) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json({
                        message: '修改成功'
                    })
                }
                conn.release();
            })
        })
    }

})
app.listen(3031, function () {
    console.log('http://localhost:3031');
})