## StatusJS

### jQuery Plugin to display status notifications based on twitter updates. 

Problem updates are sticky by default. Solved/Info updates fade out after stated delay and will only be shown once (cookie).

#### Required format

    [Prefix] [optional title in brackets] status info

#### Basic Usage

    statusJS({
      user : 'StatusJS'
    });

#### Advanced Usage

    statusJS({
      user       : 'StatusJS',        // Twitter username
      problem    : '[PROBLEM]',       // Problem prefix
      solved     : '[SOLVED]',        // Solved prefix
      info       : '[INFO]',          // Info prefix
      delay      : 6000,              // FadeOut delay
      sticky     : true,              // only takes effect for problem updates
      expiration : 1,                 // Don't show updates older than this in hours
      domain     : 'domain.com'       // Cross domain cockie support
    });
