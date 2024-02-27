define({ 

  //Type your controller code here 
  onViewCreated(){

    this.view.init = () => {
      this.initEvents();
      this.initData();
    };

  },

  initEvents(){

    this.view.listCountry.onSelection = () => {
      const selected = this.view.listCountry.selectedKeyValues[0][0];
      const cityData = [];
      data.cities[selected].forEach((city) => {
        cityData.push([city,city]);
      }
                                   );
      this.view.listCity.masterData = cityData;
    };

    this.view.btnAdd.onClick = () => {
      const event = new com.hcl.voltmx.Event({
        id: new Date().getTime().toString()
      },{},{});
      const dateComp = this.view.calDate.dateComponents;
      event.dateEvent = dateComp ? `${dateComp[1]}-${dateComp[0]}-${dateComp[2]}`:null;
      event.location = this.view.textVenue.text.trim();
      event.city = this.view.listCity.selectedKeyValues ? this.view.listCity.selectedKeyValues[0][1] : '';
      event.country = this.view.listCountry.selectedKeyValues ? this.view.listCountry.selectedKeyValues[0][1] : '';
      event.render(null);
      event.isNew = true;
      this.view.flxEvents.add(event);
    };

    this.view.btnSave.onClick = () => {
      const localEvents = JSON.parse(voltmx.store.getItem('events') || '[]');
      if(localEvents.length > 0){
        const objSvc = VMXFoundry.getObjectService('OfflineEventObjSvc',{access: 'online'});
        //         localEvents.forEach((event)=>{

        //         })
        for(var i = 0;i<localEvents.length;i++){
          const event = localEvents[i];
          if(!event.isNew) continue;
          const eventObj = new voltmx.sdk.dto.DataObject('Events');
          eventObj.addField("id", event.id);
          eventObj.addField("description", event.description);
          objSvc.create({dataObject: eventObj}, null, (error) =>{
            alert("error while saving data");
          });
        }
        voltmx.store.setItem('events','[]');
        this.initData();
      }

    };


  },

  initData(){
    this.view.flxEvents.removeAll();
    const objSvc = VMXFoundry.getObjectService('OfflineEventObjSvc',{access: 'online'});
    const eventObj = new voltmx.sdk.dto.DataObject('Events');
    objSvc.fetch({dataObject: eventObj}, (responseEvents) =>{
      data.events = [...responseEvents.records];
      for(var i = 0;i<data.events.length;i++){
        const event = new com.hcl.voltmx.Event({
          id: data.events[i].id
        },{},{});
        event.isNew = false;
        event.render(data.events[i].description);
        this.view.flxEvents.add(event);
      }
    }, (error) =>{
      alert(JSON.stringify(error));
    });

    const localEvents = JSON.parse(voltmx.store.getItem('events') || '[]');
    if(localEvents.length > 0){
      for(var i = 0;i<localEvents.length;i++){
        const event = new com.hcl.voltmx.Event({
          id: localEvents[i].id
        },{},{});
        event.isNew = true;
        event.render(localEvents[i].description);
        this.view.flxEvents.add(event);

      }}


  }



});