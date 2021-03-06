# SteamCompare(?) or other title

## [Link to the live page](https://maxoakes.github.io/steam-compare/)

## Routes

- Search is made for user _or_ user AND game
  - Profile summary is displayed
    - Profile avatar
    - Name
    - Status (Online, offline, busy, etc)
    - Level
    - Steam ID
    - Last online time (last moment they logged off)
- Search is for user only
  - List of 8 most recently played games
    - Hovering over a game tile displays their total playtime of the game
- Search is for user AND game
  - Display name of the game with a background of the game
    - Background is a high-resolution one, if available,
      otherwise it is the generic header that all Steam apps should have.
      It is of lessor resolution
    - Display number of Steam users currently in the game
    - Display the achievements that are obtained by the user out of the
      total possible
      - If the game does not have achievements, it is stated here
  - If the game has achievements, a grid of them is displayed
    - In each cell of the grid, show:
      - The color icon of the achievement
      - The achievement status for the player: either "locked" or the date and time it was unlocked by the player
      - Total percentage of players of the game who have the achievement
      - Name of the achievement
      - Description of the achievement, if there is one
  - (WIP) Table listing game's statistics, if any
    - List the name of the statistic with the number that the player has achieved

## Resources

- color palette obtained from: https://colorswall.com/palette/193/
- Github pages: https://github.com/gitname/react-gh-pages
- Offical Steam web API: https://partner.steamgames.com/doc/webapi_overview
- Unofficial API docs: https://steamapi.xpaw.me/
- Progress bar: https://react-bootstrap.github.io/components/progress/
