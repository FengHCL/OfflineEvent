define(function() {

  return {
    //define events; constructeur executé après l'initialisation des UI
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.flxBin.onClick = () =>{
        this.view.isVisible = false;
        const localEvents = JSON.parse(voltmx.store.getItem('events') || '[]');
        const newEvents = localEvents.filter((event) => event.id !== this.view.id);
        voltmx.store.setItem('events', JSON.stringify(newEvents));

      };
    },
    //Logic for getters/setters of custom properties
    //executé après le constructeur est appelé
    initGettersSetters: function() {
      defineGetter(this, 'dateEvent', () => {
        return this._dateEvent;
      });
      defineSetter(this, 'dateEvent', value => {
        this._dateEvent = value;
      });
      defineGetter(this, 'location', () => {
        return this._location;
      });
      defineSetter(this, 'location', value => {
        this._location = value;
      });
      defineGetter(this, 'city', () => {
        return this._city;
      });
      defineSetter(this, 'city', value => {
        this._city = value;
      });
      defineGetter(this, 'country', () => {
        return this._country;
      });
      defineSetter(this, 'country', value => {
        this._country = value;
      });
    },

    render(description){
      if(description){
        // === compare type et valeur
        //const pipo=0;
        //if(pipo === "0")
        if (this.country === "China") {
          voltmx.i18n.setCurrentLocaleAsync("zh_CN", this.onsuccesscallback, this.onfailurecallback);
        } else {
          voltmx.i18n.setCurrentLocaleAsync("en_GB", this.onsuccesscallback, this.onfailurecallback);
        }}
      let message = voltmx.i18n.getLocalizedString('event');
      message = description? description : message.replace('XXX',this.dateEvent).replace('YYY',this.location).replace('ZZZ',this.city).replace('CCC',this.country);
      this.view.lblEvent.text = message; 
      const localEvents = JSON.parse(voltmx.store.getItem('events') || '[]');
      localEvents.push({
        id: this.view.id,
        isNew: this.isNew,
        description: message
      });
      voltmx.store.setItem('events', JSON.stringify(localEvents));
      this.view.flxBin.isVisible = this.isNew;
    }
  };
});