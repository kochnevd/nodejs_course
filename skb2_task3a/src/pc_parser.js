function getVolumes(hddArray)
{

  var groupped = hddArray
    .reduce(function(groupper, item) {
      var sum = groupper[item.volume];
      if (!sum) sum = 0;
      groupper[item.volume] = sum + item.size;
      return groupper;
    }, {});

  for (var disk in groupped) {
    groupped[disk] = "" + groupped[disk] + "B";
  }

  return groupped;
}


export default function pc_parser(pc, path) {
  var parts = path.split('/');
  var innr=pc;

  var pathNotFound = false;

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (part && part != "") {
      if (part == "volumes" ) {
        innr = getVolumes(pc.hdd);
        break;
      } else if (part in innr) {
        innr = innr[part];
      } else {
        pathNotFound = true;
        break;
      }
    }
  }

  // return JSON.stringify(innr);
  return {
    result: innr,
    notFound: pathNotFound
  }
}
