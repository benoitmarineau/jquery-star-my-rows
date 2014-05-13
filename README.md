jquery-star-my-rows
===================

Plugin that adds stars in front of each rows of a table, which stars end up being treat as favorites


Requirements
------------

* [JQuery](http://jquery.com/)
* [Bootstrap Glyphicons CSS](http://getbootstrap.com/)


How to use it
-------------

To use this plugin, every row in your table should have an ID. You can place it wherever you want within your <tr> tags.

```html
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
```

Here is an example how to initialize this plugin

```javascript
// you need to provide a way to retrieve your ID within a row
var getMyId = function (row) {
	return row.data('id').toString();
}

$(document).ready(function () {
	// you can specify the settings the way you want them
	var settings = {
		cookieName: 'starMyRows',
		cookieExpiresInDays: 60,
		starClassName: 'star',
		color: 'black',
		getId: getMyId
	};
				
	// call the plugin on jquery element(s)
	$('#table-classement').starMyRows(settings);
});
```
