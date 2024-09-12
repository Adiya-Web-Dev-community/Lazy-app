// const BuzzFeedData = [
//   {
//     id: '1',
//     image: require('../assets/Books.jpg'),
//     username: 'User1',
//     profileImage: require('../assets/Sports.jpg'),
//     description: 'This is a description for User.',
//   },
//   {
//     id: '2',
//     image: require('../assets/Books.jpg'),
//     username: 'User2',
//     profileImage: require('../assets/Sports.jpg'),
//     description: 'This is a description for User.',
//   },
//   {
//     id: '2',
//     image: require('../assets/Books.jpg'),
//     username: 'User2',
//     profileImage: require('../assets/Sports.jpg'),
//     description: 'This is a description for User.',
//   },
//   {
//     id: '2',
//     image: require('../assets/Books.jpg'),
//     username: 'User2',
//     profileImage: require('../assets/Sports.jpg'),
//     description: 'This is a description for User.',
//   },
// ];
// export default BuzzFeedData;

const BuzzFeedData = {
  BuzzFeeds: [
    {
      id: 1,
      Username: 'User1',
      image: require('../assets/Books.jpg'),
      profileImage: require('../assets/Sports.jpg'),
      description: 'This is a description for User.',
      details: [
        {
          Img: require('../assets/Moto.jpg'),
          Img2: require('../assets/Moto2.jpg'),
          itemName: 'Moto Edge 40 Neo cacs',
          Description: 'MOTO edge 40 neo:A Comprehensive Breackdown',
          Description2:
            'The Motorola edge 40 neo is a min-range smartphone launched in september 2023.it boast a sleek design,a capable camera system,and long battry life,making  it a compelling options for user seeking a well rounded device without breaking the bank',
        },
      ],
    },
    {
      id: 2,
      Username: 'User2',
      image: require('../assets/Books.jpg'),
      profileImage: require('../assets/Sports.jpg'),
      description: 'This is a description for User.',
      details: [
        {
          Img: require('../assets/Moto.jpg'),
          Img2: require('../assets/Moto2.jpg'),
          itemName: 'Moto Edge 40 Neo',
          Description: 'MOTO edge 40 neo:A Comprehensive Breackdown',
          Description2:
            'The Motorola edge 40 neo is a min-range smartphone launched in september 2023.it boast a sleek design,a capable camera system,and long battry life,making  it a compelling options for user seeking a well rounded device without breaking the bank',
        },
      ],
    },
    {
      id: 3,
      Username: 'User3',
      image: require('../assets/Books.jpg'),
      profileImage: require('../assets/Sports.jpg'),
      description: 'This is a description for User.',
      details: [
        {
          Img: require('../assets/Moto.jpg'),
          Img2: require('../assets/Moto2.jpg'),
          itemName: 'Moto Edge 40 Neo',
          Description: 'MOTO edge 40 neo:A Comprehensive Breackdown',
          Description2:
            'The Motorola edge 40 neo is a min-range smartphone launched in september 2023.it boast a sleek design,a capable camera system,and long battry life,making  it a compelling options for user seeking a well rounded device without breaking the bank',
        },
      ],
    },
  ],
};

const DummyPostData = [
  {
    id: '1',
    username: 'John Doe',
    profileImage: require('../assets/Books.jpg'),
    postImage: require('../assets/Books.jpg'),
    likeCount: 0,
  },
  {
    id: '2',
    username: 'John Doe',
    profileImage: require('../assets/Books.jpg'),
    postImage: require('../assets/Books.jpg'),
    likeCount: 0,
  },
  {
    id: '3',
    username: 'John Doe',
    profileImage: require('../assets/Books.jpg'),
    postImage: require('../assets/Books.jpg'),
    likeCount: 0,
  },
  {
    id: '4',
    username: 'John Doe',
    profileImage: require('../assets/Books.jpg'),
    postImage: require('../assets/Books.jpg'),
    likeCount: 0,
  },
];
const Category = [
  {
    id:1,
    title:'All'
  },
  {
    id:2,
    title:'Fashion'
  },
  {
    id:3,
    title:'Books'
  },
  {
    id:4,
    title:'Digital'
  },
  {
    id:5,
    title:'Fashion'
  },
]

export {BuzzFeedData, DummyPostData,Category};
