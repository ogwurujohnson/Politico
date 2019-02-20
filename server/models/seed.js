const seedTable = `
  INSERT INTO
    tbloffice
      VALUES 
      ( default, 'federal', 'president'),
      ( default, 'state', 'governor of lagos'),
      ( default, 'legislative', 'abuja central house of representatives'),
      ( default, 'local government', 'bwari area council chairman');
  INSERT INTO
    tblparty
      VALUES
      ( default, 'peoples democratic party', 'abuja, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg'),
      ( default, 'all progressives congress', 'lagos, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg'),
      ( default, 'young progressives party', 'enugu, nigeria', 'https://politicsngr.com/wp-content/uploads/2018/03/IMG-20171125-WA0040.jpg');

  INSERT INTO
    tblusers
      VALUES
      (default, 'Johnson', 'Ogwuru', 'Onyekachi', '$2b$08$DGAJRCdx84SCCyD76nV6bugeTo7jQgqIP0YtZr2MJyKUBzh.CC.zG', 'ogwurujohnson@gmail.com', 18007593000,null, true);
`;


export default seedTable;
