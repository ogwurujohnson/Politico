const seedTable = `
  INSERT INTO
    tbloffice
      VALUES 
      ( default, 'federal', 'president'),
      ( default, 'state', 'governor of lagos'),
      ( default, 'legislative', 'abuja central house of representatives'),
      ( default, 'local government', 'bwari area council chairman');
  INSERT INTO
    tblcandidates
      VALUES 
      ( default, '1', '1', '1','i will build road, buy house, fuel villages', '1');
  INSERT INTO
    tblparty
      VALUES
      ( default, 'peoples democratic party', 'abuja, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg'),
      ( default, 'all progressives congress', 'lagos, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg'),
      ( default, 'young progressives party', 'enugu, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg');

  INSERT INTO
    tblusers
      VALUES
      (default, 'Johnson', 'Ogwuru', 'Onyekachi', '$2b$08$k47oRPWWPx2Ed2QDgXu8IOETWIAFi4FcNLFoXHPWIM0ssCI6NOdfe', 'ogwurujohnson@gmail.com', 18007593000,null, true),
      (default, 'Patrick', 'Ogwuru', 'Chidozie', '$2b$08$k47oRPWWPx2Ed2QDgXu8IOETWIAFi4FcNLFoXHPWIM0ssCI6NOdfe', 'ogwurupatrick@gmail.com', 18007593000,null, false);
`;


export default seedTable;
