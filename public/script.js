$(function() {

  // `blogsController` holds all our phrase funtionality
  var blogsController = {
    
    // compile blog templat
    template: _.template($('#blog-template').html()),

    all: function() {
      $.get('/api/blogs', function(data) {
        var allBlogs = data;
        
        // iterate through allBlogs
        _.each(allBlogs, function(blog) {
          // pass each phrase object through template and append to view
          var $blogHtml = $(blogsController.template(blog));
          $('#blog-list').append($blogHtml);
        });
        // add event-handlers to blogs for updating/deleting
        blogsController.addEventHandlers();
      });
    },

    create: function(newName, newDesc) {
      var blogData = {name: newName, desc: newDesc};
      // send POST request to server to create new phrase
      $.post('/api/blogs', blogData, function(data) {
        // pass phrase object through template and append to view
        var $blogHtml = $(blogsController.template(data));
        $('#blog-list').append($blogHtml);
      });
    },

    update: function(blogId, updatedname, updatedDesc) {
      // send PUT request to server to update phrase
      $.ajax({
        type: 'PUT',
        url: '/api/blogs/' + blogId,
        data: {
          name: updatedName,
          desc: updatedDesc
        },
        success: function(data) {
          // pass phrase object through template and append to view
          var $blogHtml = $(blogsController.template(data));
          $('#blog-' + blogId).replaceWith($blogHtml);
        }
      });
    },
    
    delete: function(blogId) {
      // send DELETE request to server to delete blog
      $.ajax({
        type: 'DELETE',
        url: '/api/blogs/' + blogId,
        success: function(data) {
          // remove deleted phrase li from the view
          $('#blog-' + blogId).remove();
        }
      });
    },

    // add event-handlers to blogs for updating/deleting
    addEventHandlers: function() {
      $('#blog-list')
        // for update: submit event on `.update-phrase` form
        .on('submit', '.update-blog', function(event) {
          event.preventDefault();
          var blogId = $(this).closest('.blog').attr('data-id');
          var updatedName = $(this).find('.updated-name').val();
          var updatedDesc = $(this).find('.updated-desc').val();
          blogsController.update(blogId, updatedName, updatedDesc);
        })
        // for delete: click event on `.delete-phrase` button
        .on('click', '.delete-blog', function(event) {
          event.preventDefault();
          var blogId = $(this).closest('.blog').attr('data-id');
          blogsController.delete(blogId);
        });
    },

    setupView: function() {
      // append existing blogs to view
      blogsController.all();
      
      // add event-handler to new-phrase form
      $('#new-blog').on('submit', function(event) {
        event.preventDefault();
        var newName = $('#new-name').val();
        var newDesc = $('#new-desc').val();
        blogsController.create(newName, newDesc);
        
        // reset the form
        $(this)[0].reset();
        $('#new-name').focus();
      });
    }
  };

  blogsController.setupView();
});

  