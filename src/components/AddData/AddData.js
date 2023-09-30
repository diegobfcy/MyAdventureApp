import React from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function AddData() {
    const transportesData = [
        {
            capacidad: 5,
            dueño: "Maria Garcia",
            id: "",
            imagen: "https://ventadecarrosgt.com/wp-content/uploads/2019/10/HONDA-CIVIC-EX-M.-2016-venta-de-carros-en-guatemala-2.jpg",
            modelo: "Honda Civic",
            placa: "ABC-456",
            precio: 110,
            valoracion: 4.6
        },
        {
            capacidad: 6,
            dueño: "Roberto Alvarado",
            id: "",
            imagen: "https://rentarcarromedellin.com/wp-content/uploads/2021/05/ford-explorer-para-alquilar-medellin.jpg",
            modelo: "Ford Explorer",
            placa: "DEF-789",
            precio: 120,
            valoracion: 4.7
        },
        {
            capacidad: 4,
            dueño: "Laura Diaz",
            id: "",
            imagen: "https://th.bing.com/th/id/R.fb16f4c06296881d02341b86f4efe033?rik=new2RmnQhuy3vA&pid=ImgRaw&r=0",
            modelo: "Chevrolet Impala",
            placa: "GHI-101",
            precio: 105,
            valoracion: 4.4
        },
        {
            capacidad: 7,
            dueño: "Carlos Torres",
            id: "",
            imagen: "https://th.bing.com/th/id/R.8999934ff48956f62489b2a10ebcc00e?rik=q4Uhr8PffTOW%2fg&pid=ImgRaw&r=0",
            modelo: "Dodge Durango",
            placa: "JKL-112",
            precio: 130,
            valoracion: 4.8
        },
        {
            capacidad: 4,
            dueño: "Daniela Ramírez",
            id: "",
            imagen: "https://th.bing.com/th/id/OIP.tBYhaaA9adPzxp77_BTX-gHaJ4?pid=ImgDet&rs=1",
            modelo: "Nissan Sentra",
            placa: "MNO-123",
            precio: 95,
            valoracion: 4.3
        },
        {
            capacidad: 5,
            dueño: "Oscar Blanco",
            id: "",
            imagen: "https://th.bing.com/th/id/R.70fc6e14efe23b06063a738f9a4ce8fd?rik=NDsCvRwghHzVDQ&pid=ImgRaw&r=0",
            modelo: "Hyundai Elantra",
            placa: "PQR-145",
            precio: 100,
            valoracion: 4.5
        },
        {
            capacidad: 4,
            dueño: "Isabel Cordero",
            id: "",
            imagen: "https://img.remediosdigitales.com/cc607f/kia-optima_3/1024_2000.jpg",
            modelo: "Kia Optima",
            placa: "STU-156",
            precio: 105,
            valoracion: 4.4
        },
        {
            capacidad: 6,
            dueño: "Fernando Gómez",
            id: "",
            imagen: "https://img.automexico.com/2020/02/28/3bd42967-4-a4df.jpg",
            modelo: "Jeep Cherokee",
            placa: "VWX-178",
            precio: 125,
            valoracion: 4.7
        },
        {
            capacidad: 5,
            dueño: "Lucía Ruiz",
            id: "",
            imagen: "https://th.bing.com/th/id/OIP.yLQjL4NtXIU8Fw3FI5-OvgHaI6?pid=ImgDet&rs=1",
            modelo: "Mazda 3",
            placa: "YZA-190",
            precio: 110,
            valoracion: 4.6
        }    
    ]
    const lugaresData = [
        {
            descripcion: "Será un día de escalada a orillas del Río Chili en el Valle de Chilina.",
            etiquetas: ["Aventura", "Paisaje", "", "", "", ""],
            id: "",
            imagen: [
                "https://i.postimg.cc/vBVqrx4m/cabalgataskgo.jpg", 
                "",
                ""
            ],
            latitud: -16.363911, 
            longitud: -71.52916,
            nombre: "Escalada en Roca Arequipa en Valle de Chilina",
            precio: 0,
            valoracion: 4.9
        },
        {
            descripcion: "Gimnasio de escalada, Boulder y escalada deportiva, Venta y alquiler de materiales de escalada,",
            etiquetas: ["Aventura", "Paisaje", "", "", "", ""],
            id: "",
            imagen: [
                "https://www.bing.com/th?id=OLC.iOR25R%2fqzPyisg480x360&w=208&h=183&c=8&rs=1&qlt=90&pid=3.1&rm=2", 
                "",
                ""
            ],
            latitud: -16.383600,
            longitud:  -71.524719,
            nombre: "Centro Cultural de Montaña CCM Escalada Montañismo Terapias Escaloterapia",
            precio: 0,
            valoracion: 4.5
        },
        {
            descripcion: "Mono Blanco Aventura nace con la iniciativa de un grupo de amigos, de dar a conocer las cumbres peruanas a los aventureros de todo el mundo",
            etiquetas: ["Aventura", "Paisaje", "", "", "", ""],
            id: "",
            imagen: [
                "https://www.bing.com/th?id=OLC.n8N7tz%2fkbahUIA480x360&w=105&h=140&c=8&rs=1&qlt=90&pid=3.1&rm=2", 
                "",
                ""
            ],
            latitud: -16.408094, 
            longitud: -71.545151,
            nombre: "Mono Blanco Aventura",
            precio: 0,
            valoracion: 4.8
        },
        {
            descripcion: "Una belleza arquitectónica hecha de silla, con detalles hermosos en su fachada, al igual que en los altares de su interior.",
            etiquetas: ["Aventura", "Paisaje", "", "", "", ""],
            id: "",
            imagen: [
                "https://www.bing.com/th?id=OLC.ofTftfTKPEHqTA480x360&w=186&h=140&c=8&rs=1&qlt=90&pid=3.1&rm=2", 
                "",
                ""
            ],
            latitud: -16.399771, 
            longitud: -71.536522,
            nombre: "Iglesia de La Compañía de Jesus",
            precio: 0,
            valoracion: 4.3
        },
        {
            descripcion: "MUVI invites you to live the winemaking experience using all your senses. During the tour, you will observe scale models of ancient and modern wineries.",
            etiquetas: ["Aventura", "Paisaje", "", "", "", ""],
            id: "",
            imagen: [
                "https://www.bing.com/th?id=OLC.Y6nxLfwGLHBiUA480x360&w=248&h=140&c=8&rs=1&qlt=90&pid=3.1&rm=2", 
                "",
                ""
            ],
            latitud: -16.383959, 
            longitud: -71.543055,
            nombre: "Museo Vivencial del Vino y Pisco",
            precio: 0,
            valoracion: 4.8
        },
        {
            descripcion: "Parroquia San Miguel Arcángel Cayma is a Catholic church located in Cayma .",
            etiquetas: ["Aventura", "Paisaje", "", "", "", ""],
            id: "",
            imagen: [
                "https://www.bing.com/th?id=OLC.8mYRO9HDh0IF4Q480x360&w=137&h=183&c=8&rs=1&qlt=90&pid=3.1&rm=2", 
                "",
                ""
            ],
            latitud: -16.385679, 
            longitud: -71.546471,
            nombre: "Iglesia de San Miguel Arcángel",
            precio: 0,
            valoracion: 4.0
        },
        {
            descripcion: "This museum’s main attraction is Juanita, whose ritually sacrificed and frozen body was unearthed in a volcanic explosion.",
            etiquetas: ["Aventura", "Paisaje", "", "", "", ""],
            id: "",
            imagen: [
                "https://www.bing.com/th?id=OLC.bZ3d9UFWA42dyQ480x360&w=248&h=140&c=8&rs=1&qlt=90&pid=3.1&rm=2", 
                "",
                ""
            ],
            latitud: -16.399805, 
            longitud: -71.537880,
            nombre: "Museo Santuarios Andinos",
            precio: 0,
            valoracion: 4.3
        }

    ];

    const guiasData = [
        {
            "background": "https://invoyager.com/wp-content/uploads/2019/10/Plaza-de-armas.jpg",
            "descripcion": "Carlos es un apasionado de la historia local. Con más de una década de experiencia, ha guiado a turistas por los rincones más emblemáticos de la ciudad. Desde plazas históricas hasta mercados locales, su enfoque es contar la historia detrás de cada lugar. Es perfecto para aquellos que desean profundizar en la cultura y tradiciones de la región.",
            "disponibilidad": "Lunes a Viernes de 10am a 6pm",
            "edad": 42,
            "etiquetas": ["Español", "Inglés", "Italiano", "", ""],
            "imagen": "https://elcomercio.pe/resizer/ywRabokiTNI2VGpnyFR2z87wh-Q=/560x315/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/Z3XWGDDV3ZC4XLEKQLMY2ARZXE.jpg",
            "nombre": "Carlos Valdez",
            "precio": 90,
            "transporte": true,
            "valoracion": 4.7
          },
          {
            "background": "https://turismoalperu.com/wp-content/uploads/2015/03/cayma.jpg",
            "descripcion": "Luisa es una entusiasta de la naturaleza y la ecología. Su especialidad es guiar a visitantes por parques nacionales y reservas ecológicas. Su pasión es la conservación y educación ambiental. Si estás buscando una experiencia más verde y deseas conocer la flora y fauna local, Luisa es tu guía ideal. Su enfoque sostenible te encantará.",
            "disponibilidad": "Martes a Sábado de 8am a 4pm",
            "edad": 38,
            "etiquetas": ["Español", "Alemán", "", "", ""],
            "imagen": "https://th.bing.com/th/id/R.5cff7407100fd8abc1f7397853c0d8d8?rik=Gk%2boV%2bWFPMivKQ&pid=ImgRaw&r=0",
            "nombre": "Luisa Fernández",
            "precio": 100,
            "transporte": false,
            "valoracion": 4.9
          },
          {
            "background": "https://www.paquetesdeviajesperu.com/wp-content/uploads/2022/07/Destinos-pupolares-arequipa-scaled.jpg",
            "descripcion": "Mateo, aficionado al arte y la cultura urbana, ofrece recorridos por museos, galerías y murales callejeros. Su profundo conocimiento sobre arte contemporáneo, así como el contexto histórico de las piezas, brinda una experiencia inigualable. Si buscas sumergirte en la escena artística local, no busques más. Mateo es tu guía ideal para esta aventura cultural.",
            "disponibilidad": "Lunes a Domingo de 11am a 7pm",
            "edad": 29,
            "etiquetas": ["Español", "Inglés", "Portugués", "", ""],
            "imagen": "https://theblogger.info/wp-content/uploads/2022/02/dl.beatsnoop.com-1643866675-min-1.jpg",
            "nombre": "Mateo Rivera",
            "precio": 85,
            "transporte": true,
            "valoracion": 4.6
          },
          {
            "background": "https://www.paquetesdeviajesperu.com/wp-content/uploads/2022/07/Destinos-pupolares-arequipa-scaled.jpg",
            "descripcion": "Ana, con una especialización en gastronomía local, lleva a los visitantes a un viaje culinario. Explora mercados, tiendas locales y restaurantes escondidos para brindar una experiencia deliciosa. Si eres un foodie o simplemente amas descubrir nuevos sabores, Ana te mostrará los platos tradicionales y las historias que los rodean.",
            "disponibilidad": "Miércoles a Domingo de 12pm a 8pm",
            "edad": 70,
            "etiquetas": ["Español", "Francés", "Japonés", "", ""],
            "imagen": "https://th.bing.com/th/id/OIP.MZ5rglF4FUNT2l2onKuADwHaHZ?pid=ImgDet&rs=1",
            "nombre": "Ana García",
            "precio": 190,
            "transporte": false,
            "valoracion": 4.5
          },
          {
            "background": "https://www.paquetesdeviajesperu.com/wp-content/uploads/2022/07/Destinos-pupolares-arequipa-scaled.jpg",
            "descripcion": "Eduardo, amante de la arquitectura moderna, te guiará por las maravillas arquitectónicas de la ciudad. Desde rascacielos icónicos hasta innovadoras construcciones residenciales, su pasión y conocimiento en diseño y estructuras es evidente. Perfecto para aquellos interesados en el diseño urbano y la evolución de la arquitectura local.",
            "disponibilidad": "Martes a Sábado de 10am a 6pm",
            "edad": 40,
            "etiquetas": ["Español", "Inglés", "Chino", "", ""],
            "imagen": "https://plazaradio.valenciaplaza.com/public/Image/2021/2/1614176912vilaplana_NoticiaAmpliada.jpg",
            "nombre": "Eduardo Li",
            "precio": 80,
            "transporte": true,
            "valoracion": 4.8
          },
          {
            "background": "https://www.paquetesdeviajesperu.com/wp-content/uploads/2022/07/Destinos-pupolares-arequipa-scaled.jpg",
            "descripcion": "Rebeca es experta en folklore y tradiciones. Su enfoque se centra en festivales, ceremonias y rituales de la región. Viaja en el tiempo con ella para comprender el tejido cultural que ha moldeado la identidad local. Sus relatos, combinados con visitas a lugares significativos, crean una experiencia inmersiva inolvidable.",
            "disponibilidad": "Jueves a Lunes de 9am a 5pm",
            "edad": 32,
            "etiquetas": ["Español", "Inglés", "Ruso", "", ""],
            "imagen": "https://th.bing.com/th/id/OIP.IqzDYNIM1i2-mzPRiP-GPQHaJ2?pid=ImgDet&rs=1",
            "nombre": "Rebeca Vázquez",
            "precio": 95,
            "transporte": false,
            "valoracion": 4.9
          },
          {
            "background": "https://www.paquetesdeviajesperu.com/wp-content/uploads/2022/07/Destinos-pupolares-arequipa-scaled.jpg",
            "descripcion": "Javier, con un amor profundo por la música, te sumerge en el panorama musical de la ciudad. Desde conciertos en vivo hasta estudios de grabación históricos, su tour es una delicia para los amantes de la música. Descubre la evolución de géneros, artistas icónicos y la vibrante escena musical actual con su guía experta.",
            "disponibilidad": "Viernes a Martes de 1pm a 9pm",
            "edad": 28,
            "etiquetas": ["Español", "Inglés", "Italiano", "", ""],
            "imagen": "https://thumbs.dreamstime.com/b/apuesto-hombre-hispano-mirando-el-mapa-de-viajes-en-parque-263810249.jpg",
            "nombre": "Javier Mendoza",
            "precio": 90,
            "transporte": true,
            "valoracion": 5.0
          },
          {
            "background": "https://www.paquetesdeviajesperu.com/wp-content/uploads/2022/07/Destinos-pupolares-arequipa-scaled.jpg",
            "descripcion": "Carla, apasionada por la naturaleza, guía a turistas por senderos montañosos y paisajes serenos. Su conocimiento en botánica y vida silvestre garantiza una travesía educativa. Si buscas aventuras al aire libre y un respiro de la ciudad, Carla es la compañía perfecta. Disfruta de vistas panorámicas y aprende sobre el ecosistema local.",
            "disponibilidad": "Lunes a Viernes de 8am a 4pm",
            "edad": 34,
            "etiquetas": ["Español", "Inglés", "Alemán", "", ""],
            "imagen": "https://thumbs.dreamstime.com/b/turistas-da-menina-que-tomam-imagens-no-fundo-do-karadag-115729607.jpg",
            "nombre": "Carla Rodríguez",
            "precio": 75,
            "transporte": false,
            "valoracion": 4.7
          }                
    ];

    const addDataToFirestore = async (dataList, collectionName) => {
        for (let data of dataList) {
            try {
                const docRef = await addDoc(collection(db, collectionName), data);
                console.log(`Documento agregado a ${collectionName} con ID: `, docRef.id);
            } catch (error) {
                console.error(`Error al agregar el documento a ${collectionName}: `, error);
            }
        }
    }

    const handleAddData = () => {
        addDataToFirestore(transportesData,'Transportes');
        addDataToFirestore(lugaresData, 'Lugares');
        addDataToFirestore(guiasData, 'Guias');
    }

    return (
        <button onClick={handleAddData}>Agregar datos a Firestore</button>
    );


}

export default AddData;