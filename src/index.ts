import express, {Request, Response} from 'express';


const app = express();
const port = 3003;
const jsonMiddleware = express.json();

app.use(jsonMiddleware);


let db = {
    products: [
        {
            id: 1,
            photo: 'https://i.siteapi.org/15DJPS5sw1dJj0hzuxYY_qrizAg=/fit-in/0x0/center/top/filters:fill(transparent):format(webp)/s.siteapi.org/f2a114360252916.ru/img/2rgywuk3jmqsog0ck84k4k0ksowsw0',
            name: 'Фигурка 1/8 Люпусрегина Бета (Lupusregina Beta 10th Anniversary so-bin Ver.)',
            price: 35500
        },
        {
            id: 2,
            photo: 'https://i.siteapi.org/80W9q-pquRrjGdKBWtoy6yAnWHQ=/fit-in/0x0/center/top/filters:fill(transparent):format(webp)/s.siteapi.org/f2a114360252916.ru/img/7mfycwb23ako4c8c404wck8cc4cgss',
            name: 'Фигурка Трафальгар Ло (Law Trafalgar The Raid on Onigashima S.H.Figuarts)',
            price: 32000
        },
        {
            id: 3,
            photo: 'https://i.siteapi.org/mz2ssWMrf2Qlarsw70Di9PuUkvY=/fit-in/0x0/center/top/filters:fill(transparent):format(webp)/s.siteapi.org/f2a114360252916.ru/img/p3xw13mj2j48kkk0k0w8wokcgc8og0',
            name: 'Фигурка 1/7 Shino Swimsuit Ver.',
            price: 800
        },
        {
            id: 4,
            photo: 'https://i.siteapi.org/c-18mYTUcWIebTKUGSVp3VVhAdE=/fit-in/0x0/center/top/filters:fill(transparent):format(webp)/s.siteapi.org/f2a114360252916.ru/img/fskwrbm2jjswcwo0sgk8k0sws4oc8s',
            name: 'Фигурка 1/7 Марсиль Донато (Marcille Donato Student Ver.)',
            price: 800
        },
        {
            id: 5,
            photo: 'https://i.siteapi.org/ieBoyXdf_rIAiYgYdLMgBzZdhhc=/fit-in/0x0/center/top/filters:fill(transparent):format(webp)/s.siteapi.org/f2a114360252916.ru/img/67xd0bavdp0cgksw84g4sco8o40g8o',
            name: 'Фигурка Момонга (Momonga / Ainz Ooal Gown Bandai Spirits)',
            price: 800
        },
        {id: 6, photo: '', name: '', price: 800},
    ],
    users: [
        {id: 1, userName: 'Sas', email: 'zh31n@mail.ru', password: 'qwerty1234'},
        {id: 2, userName: 'Hs', email: 'zh31n@mail.ru', password: 'qwerty1234'},
        {id: 3, userName: 'glhf', email: 'zh31n@mail.ru', password: 'qwerty1234'},
    ]
}


app.get('/products/:id?', (req: Request, res: Response) => {
    if (req.params.id) {
        const id = req.params.id;
        const data = db.products.filter(p => p.id === +id)
        if (!data.length) {
            res.sendStatus(404)
        }
        res.json(data)
    } else {
        const resJs = {
            products: db.products,
            statusCode: 0,
            length: db.products.length
        }
        res.json(resJs);
    }

});
app.post('/products', (req: Request, res: Response) => {
    if (!req.body.name || !req.body.price) {
        res.sendStatus(400);
        return;
    }
    const createdProduct = {
        id: +(new Date()),
        photo: req.body.photo,
        name: req.body.name,
        price: req.body.price
    }

    db.products.push(createdProduct);
    res.status(201).json(createdProduct)
})
app.delete('/products/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        res.sendStatus(400)
        return;
    }
    db.products = db.products.filter(p => p.id !== +req.params.id)
    const response = {
        message: 'successful',
        newProducts: db.products
    }
    res.json(response);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})