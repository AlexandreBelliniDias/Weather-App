function fun() { 
			
			var url= document.getElementById("cityInput").value;
			url = 'http://api.openweathermap.org/data/2.5/weather?q=' + url + '&APPID=f277cf03a0ce694cad5c6ad70ee835e2'

		fetch(url)
			.then((resp) => resp.json())
			.then(function (data) {
				document.getElementById("main").style.display = "block";
				
				let temperatureToCel = Math.round(data.main.temp -273.15);
				let feels_likeToCel = Math.round(data.main.feels_like -273.15);
				let temp_minToCel = Math.round(data.main.temp_min -273.15);
				let temp_maxToCel = Math.round(data.main.temp_max -273.15);
				let visibilityToKM = Math.round(data.visibility / 1000);
				
				let dt = new Date(data.sys.sunrise * 1000)
   				let h = dt.getHours()
    			let m = "0" + dt.getMinutes()
				let total = h + ":" + m.substr(-2)
				
				let dt2 = new Date(data.sys.sunset * 1000)
   				let h2 = dt2.getHours()
    			let m2 = "0" + dt2.getMinutes()
				let total2 = h2 + ":" + m2.substr(-2)
				
				// weather-head
				document.getElementById('location').innerHTML = data.name + " "+  data.sys.country;
				document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-owm-200"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				document.getElementById('temperature').innerHTML = `${temperatureToCel}` + '<i id="icon-thermometer" class="wi wi-thermometer"></i>';
				// weather-body row 1
				document.getElementById('feels_like').innerHTML = '<i class="wi wi-thermometer-internal"></i>' + '<span> Feels like<br>' + `${feels_likeToCel}` + 'º</span>' ;
				document.getElementById('temp_min').innerHTML = '<i class="wi wi-thermometer-exterior"></i>' + '<span> Min<br>'+ `${temp_minToCel}` + 'º</span>';
				document.getElementById('temp_max').innerHTML = '<i class="wi wi-thermometer"></i>' + '<span> Max<br>' + `${temp_maxToCel}` +'º</span>';
				// weather-body row 2
				document.getElementById('humidity').innerHTML = '<i class="wi wi-humidity"></i>' + '<span> Humidity<br>' + `${data.main.humidity}` +' %</span>' ;
				document.getElementById('wind').innerHTML = '<i class="wi wi-strong-wind"></i>' + '<span> Wind Speed<br>'+ `${data.wind.speed}` + ' km/h</span>';
				document.getElementById('visibility').innerHTML = '<i class="fa fa-eye"></i>' + '<span> Visibility<br>' + `${visibilityToKM}` +' km</span>';
				// weather-body row 3
				document.getElementById('sunrise').innerHTML = '<i class="wi wi-direction-up"></i>' + '<span> Sunrise<br>' + `${total}` +'h </span>' ;
				document.getElementById('sunset').innerHTML = '<i class="wi wi-direction-down"></i>' + '<span> Sunset<br>'+ `${total2}` + 'h</span>';
				document.getElementById('clouds').innerHTML = '<i class="wi wi-cloud"></i>' + '<span> Clouds<br>' + `${data.clouds.all}` +' %</span>';

				document.getElementById("cityInput").style.color = 'black';

				// background and icon change
				if(data.weather[0].main == 'Clear'){
					document.body.style.background ="url('https://wallpaperaccess.com/full/58341.jpg') no-repeat"
					document.body.style.backgroundSize =  'cover';
					console.log('Clear')
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-day-sunny"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				} else if (data.weather[0].main == 'Rain' ){
					document.body.style.background = "url('https://wallpaperaccess.com/full/1170358.jpg') no-repeat";
					document.body.style.backgroundSize = 'cover';
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-showers"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
					console.log('Rain')
				} else if (data.weather[0].main == 'Clouds' || data.weather[0].main == 'Drizzle'){
					document.body.style.background = "url('https://cdn.pixabay.com/photo/2013/11/12/20/46/clouds-209704_960_720.jpg') no-repeat";
					document.body.style.backgroundSize = 'cover';
					console.log('Clouds or Drizzle')
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-cloudy"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				}
				else if (data.weather[0].main == 'Snow'){
					document.body.style.background = "url('https://s1.1zoom.me/big0/871/404674-svetik.jpg') no-repeat";
					document.body.style.backgroundSize = 'cover';
					console.log('Snow')
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-snow"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				} 
				else if (data.weather[0].main == 'Thunderstorm'){
					document.body.style.background = "url('https://c4.wallpaperflare.com/wallpaper/246/411/711/thunder-lightning-sky-atmosphere-wallpaper-preview.jpg') no-repeat";
					document.body.style.backgroundSize = 'cover';
					console.log('Thunderstorm')
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-thunderstorm"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				}
				else if (data.weather[0].main == 'Fog' || data.weather[0].main == 'Dust' || data.weather[0].main == 'Sand' || data.weather[0].main == 'Mist' || data.weather[0].main == 'Haze'){
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-fog"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				}
				else if (data.weather[0].main == 'tornado'){
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-tornado"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				}
				else if (data.weather[0].main == 'volcanic ash'){
					document.getElementById('description').innerHTML = '<i id="icon-desc" class="wi wi-volcano"></i>' + '<p>' + `${data.weather[0].description}` + '</p>';
				}
				
				
			})
			.catch(function (error) {
				console.log(error);
				let notFound = ("The city was not found")
				alert("The city was not found")
				document.getElementById("cityInput").value = notFound
				document.getElementById("cityInput").style.color = 'red';
				
			});
		}
