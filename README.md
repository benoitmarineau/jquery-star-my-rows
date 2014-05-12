jquery-star-my-rows
===================

Plugin that adds stars in front of each rows of a table, which stars end up being treat as favorites


Requirements
------------

* [JQuery](http://jquery.com/)
* [Bootstrap Glyphicons CSS](http://getbootstrap.com/)


How to use it
-------------

To use this plugin, every row in your table should have a way to return its ID.

<code>
<table id="my-table">
  <thead>
      <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>                    
      </tr>
  </thead>
  <tbody>
      <tr data-id="1">
          <td>R1C1</td>
          <td>R1C2</td>
          <td>R1C3</td>
      </tr>
      <tr data-id="2">
          <td>R2C1</td>
          <td>R2C2</td>
          <td>R2C3</td>
      </tr>
  </tbody>
        
</table>
</code>
