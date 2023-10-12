//Function to format date as MM/DD/YYYY
function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
    ).getFullYear()}`;
}

//Function to display Rating stars
function getStars(rating) {
    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
   
    // Append all the filled whole stars
    for (var y = rating; y >= 1; y--)
      output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    // If there is a half a star, append it
    if (y == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    // Fill the empty stars
    for (let x = (5 - rating); x >= 1; x--)
      output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
      strResultsStars = output.join(''); 
      return strResultsStars;  
  }

module.exports = { formatDate, getStars}
