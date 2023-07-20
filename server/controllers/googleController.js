const googleController = {};

spotifyController.getAccountInfo = async (req, res, next) => {

    try {
      console.log('entered getAccountInfo');
      console.log('body', req.body);
      const accessToken = req.body.accessToken;
      console.log('accessToken', accessToken);
  
      const searchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      };
      const response = await fetch('https://api.spotify.com/v1/me', searchParams);
      const data = await response.json();
      console.log('data', data);
      const { email, display_name } = data;
      console.log('email', email, 'dispaly name', display_name);
      res.locals.email = email;
      res.locals.username = display_name;
      console.log('leaving getAccountInfo');
      return next();
    } catch (err) {
      return next({
        log: `spotifyController.getAccountInfo ERROR: trouble fetching spoitfy email`,
        message: {
          err: `spotifyController.getAccountInfo: ERROR: ${err}`,
        },
      });
    }
  };
  
  module.exports = spotifyController;
  