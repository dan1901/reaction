Meteor.startup(function () {
  ReactionRouter = FlowRouter.group({});

  const pkgs = ReactionCore.Collections.Packages.find().fetch();

  for (let pkg of pkgs) {
    for (let registryItem of pkg.registry) {
      if (registryItem.route) {
        if (registryItem.route.substr(0, 1) !== "/") {
          registryItem.route = `/${registryItem.route}`;
        }
        console.log(registryItem);
        ReactionRouter.route(registryItem.route, {
          name: registryItem.route,
          action: function () {
            BlazeLayout.render("coreLayout", registryItem.template);
          }
        });
      }
    }
  }
});