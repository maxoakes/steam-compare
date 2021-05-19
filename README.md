# SteamCompare(?) or other title

## [Link to the live page](https://maxoakes.github.io)

## Homepage structure

- Content Body
  - Bootstrap row
    - Div of Title and banner background image
  - Bootstrap row
    - Div of Center Body with plain background
      - Div of Form for seach center
  - Bootstrap row
    - Div of Footer with small text information

## User page structure

- Content Body
  - Bootstrap row
    - Div of Title and banner background image
  - Bootstrap row
    - Div Body structure
      - Bootstrap row
        - User profile pic and general stats (username et al)
          - Profile pic
          - Profile text
        - Searchbox with one field for username and one for game
      - Bootstrap row
        - Game content lists
          - Games owned
          - Profile badges
          - Artwork
          - Achievements
        - Charts
          - Total playtime
          - Total Money spent
  - Bootstrap row
    - Div of Footer with small text information

## Notes

- Title banner and footer should be the exact same style and structure for each page
- After the main content div, header/center/footer, and one level of div (for the profile page, it is the user stats and search box), Bootstrap divs should stop being used. The row divs are already pretty bulky looking in the code.
- The content of the game lists is very WIP. I don't know what the best layout or organization should be.
- The page for a game content for a specific user should be the same layout and style as the user page, but just display different content in the game content and chart divs.

## TODO

- Try to reduce the amount of divs. There are divs within divs and they can probably be cleaned up.

## Resources

- Glow-effect - https://www.w3schools.com/howto/howto_css_glowing_text.asp
