import {produce} from "immer";
const initialState = {
    list: [
        {
            id: 0,
            url: 'https://pickaface.net/gallery/avatar/unr_demo_181102_1037_17ut.png',
            name: 'Vu Hoai Nam - 1',
            count: 100
        },
        {
            id: 1,
            url: 'https://pickaface.net/gallery/avatar/unr_demo_181102_1037_17ut.png',
            name: 'La Phong Lam - 2',
            count: 100
        },
        {
            id: 2,
            url: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'Trinh Thanh Binh - 3',
            count: 100
        },
        {
            id: 3,
            url: 'https://pickaface.net/gallery/avatar/sebastiankuiper528c7e6e053fc.png',
            name: 'Tran Thanh - 4',
            count: 100
        },
        {
            id: 4,
            url: 'https://i.pinimg.com/564x/23/e3/4d/23e34daa0988e72117532b4ba61ba3df.jpg',
            name: 'Tien Dat - 5',
            count: 100
        },
        {
            id: 5,
            url: 'https://pickaface.net/gallery/avatar/20120117_083743_291_Demo.png',
            name: 'Phong Vu - 6',
            count: 100
        }
    ],
    listPositions: [],
}
// const nextState = produce(initialState, draftState => {
    
// })

const rankListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_NEW_LIST': {
            const newList = action.payload;
            return {...state,list: newList}
        }
        case 'UPDATE_NEW_LIST_POSITIONS': {
            const newList = action.payload;
            // debugger
            return {...state,listPositions: newList}
        }
        default: return state;
    }
}

// const rankListReducer =produce ((draft , action) => {
//     // produce(state, draft => {
//         switch (action.type) {
//             case 'UPDATE_NEW_LIST': {
//                 draft ={list:action.payload} ;
//                 // debugger;
//                 break;
//             }
//             default: break ;
//         }
//     // })
// },initialState)

// const curriedProduce = produce((draft, action) => {
//     switch (action.type) {
//     case 'ADD_PACKAGE':
//       draft.packages.push(action.package);
//       break;
//     case 'SET_INSTALLED': {
//       const package = draft.packages.filter(p => p.name === action.name)[0];
//       if (package) package.installed = action.installed;
//       break;
//     }
//     default:
//       break;
//     }
//   });
  

export default rankListReducer;