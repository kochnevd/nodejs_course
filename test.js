function getVolumes(hddArray)
{
  debugger;

  var groupped = hddArray.reduce(function(groupper, item) {
    sum = groupper[item.volume];
    if (!sum) sum = 0;
    groupper[item.volume] = sum + item.size;
    return groupper;
  }, {});

  return groupped;
}


function get(obj, path)
{
  var parts = path.split('/');
  var innr=obj;

  for (var i = 0; i < parts.length; i++) {
    part = parts[i];
    if (part && part != "") {
      if (part == "volumes" ) {
        innr = getVolumes(obj.hdd);
        break;
      } else if (part in innr) {
        innr = innr[part];
      } else {
        return "Not Found";
      }
    }
  }

  return JSON.stringify(innr);
}

const jObject = '{"board":{"vendor":"IBM","model":"IBM-PC S-100","cpu":{"model":"80286","hz":12000},"image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg","video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"},"ram":{"vendor":"CTS","volume":1048576,"pins":30},"os":"MS-DOS 1.25","floppy":0,"hdd":[{"vendor":"Samsung","size":33554432,"volume":"C:"},{"vendor":"Maxtor","size":16777216,"volume":"D:"},{"vendor":"Maxtor","size":8388608,"volume":"C:"}],"monitor":null,"length":42,"height":21,"width":54}';

const tests = [
  "",
  "/",
  "/ram",
  "/ram/vendor",
  "/ram/someField",
  "/monitor",
  "/volumes",
];

try {
  const object = JSON.parse(jObject);
  console.log('SOURCE OBJECT:\r\n****************************************************');
  console.log(object);

  tests.forEach((test) => {
    console.log('****************************************************');
    console.log('Query is: "' + test + '"');

    var result = get(object, test);

    console.log('RESULT:');
    console.log(result);
  });

} catch (e) {
  console.log(e);
}

/*

function get(obj, path)
{
                console.log("**** obj:");
                console.log(obj);
                console.log("**** path:");
                console.log(path);

                var parts = path.split('/');

                console.log("**** parts:");

                var innr=obj;
                parts.forEach( (part) => {
                  innr=innr[part];
                  console.log("part=" + part);
                  console.log("innr=" + innr);
                });
                return JSON.stringify(innr);
}

var obj = {
                name: "petrov",
                role: "developer",
                son: {
                  name: "petya",
                  age: 10,
                  toys: [
                    {
                      name: "doll",
                      cost: 10.0
                    },
                    {
                      name: "car",
                      cost: 20.0
                    }
                  ]
                },
                daughter: {
                  name: "olya",
                  age: 5
                }
};

console.log(get(obj, "son/toys"));

*/
