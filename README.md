## StatusJS

### jQuery Plugin to display status notifications based on twitter updates. 

Problem updates are sticky by default. Solved/Info updates fade out after stated delay and will only be shown once (cookie).

Demo: [http://jsfiddle.net/Ktvaq/](http://jsfiddle.net/Ktvaq/)

#### Required format

    [Prefix] [optional title in brackets] status info

#### Basic Usage

    statusJS({
      user : 'StatusJS'
    });

#### Advanced Usage

    statusJS({
      user    : 'StatusJS',  // Twitter username
      problem : '[PROBLEM]', // Problem prefix
      solved  : '[SOLVED]',  // Solved prefix
      info    : '[INFO]',    // Info prefix
      delay   : 3000,        // FadeOut delay
      sticky  : true         // only takes effect for problem updates
    });