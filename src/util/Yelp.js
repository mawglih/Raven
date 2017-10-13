const clientId = 'vJl4VC3dSZJiB9n8qHD53Q';
const clientSecret = 'C3V6REj7PzYl2WfNPU32ZdXjrAPfcnAMtidZ2b1ONooyHVXgKk8L9lqz4P3zXQM8';
let accessToken;
export const Yelp = {
    getAccessToken() {
        if (accessToken) {
            return new Promise(resolve =>
                resolve(accessToken));
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`, { method: 'POST' })
            .then(response => {
                console.log('Fetch response: ',response);
                return response.json();
            })
            .then(jsonResponse => {
                accessToken = jsonResponse.access_token;
                console.log('Access token: ',accessToken);
            })
    },
    search(term, location, sortBy) {
        return Yelp.getAccessToken().then(res => {
            return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}N&sort_by=${sortBy}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(response => {
                    console.log('Search response: ', response);
                    return response.json();
                })
                .then(jsonResponse => {
                    if (jsonResponse.businesses) {
                        return jsonResponse.businesses.map(business => {
                            console.log('Business response: ', business);
                            return {
                                id: business.id,
                                imageSrc: business.image_url,
                                name: business.name,
                                address: business.location.address1,
                                city: business.location.city,
                                state: business.location.state,
                                zipCode: business.location.zip_code,
                                country: business.location.country,
                                category: business.categories.alias,
                                rating: business.rating,
                                reviewCount: business.review_count
                            }
                        })
                    }
                })
        });
    }
};
