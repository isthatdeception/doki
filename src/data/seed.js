/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)

/**
 * firebase
 * @param {*} firebase
 * this function is to seed the database with mock user data for the intial dev cycle
 *
 * populating the database
 */
export function seedDatabase(firebase) {
  const users = [
    {
      userId: "CTLGRWHbmOZ0kQF6UykachkLXUm1",
      username: "chitoge",
      fullName: "Chitoge Kirisaki",
      emailAddress: "chitoge@email.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "kato",
      fullName: "kato megumi",
      emailAddress: "katomegumi@email.com",
      following: [],
      followers: ["CTLGRWHbmOZ0kQF6UykachkLXUm1"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "raku",
      fullName: "Raku Ichigo",
      emailAddress: "raku@email.com",
      following: [],
      followers: ["CTLGRWHbmOZ0kQF6UykachkLXUm1"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "asuna",
      fullName: "Asuna",
      emailAddress: "asuna@email.com",
      following: [],
      followers: ["CTLGRWHbmOZ0kQF6UykachkLXUm1"],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "raku",
            comment: "Damn this is so good!",
          },
          {
            displayName: "kato",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
