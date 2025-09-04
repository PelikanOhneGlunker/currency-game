class LocalStorageManager {
    /**
     * 
     * @param {*} storageId 
     */
    constructor(storageId) {
      this.storageId = storageId
    }
    /**
     * Speichert einen Wert im localStorage
     * @param {any} value - Der zu speichernde Wert (unterstützt Strings, Numbers, Booleans, Arrays und Objekte)
     */
    save(value) {
      try {
        localStorage.setItem(this.storageId, value);
        return true;
      } catch (error) {
        console.error('Fehler beim Speichern im localStorage:', error);
        return false;
      }
    }
  
    /**
     * Liest einen Wert aus dem localStorage
     * @returns {string} Der gespeicherte Wert oder defaultValue
     */
    load() {
        try {
          const value = localStorage.getItem(this.storageId);
          return value;
        } catch (error) {
          console.error('Fehler beim Lesen aus dem localStorage:', error);
          return null;
        }
      }
  
    /**
     * Prüft, ob ein Schlüssel im localStorage existiert
     * @returns {boolean} true, wenn der Schlüssel existiert
     */
    exists() {
      return localStorage.getItem(this.storageId) !== null;
    }
}

async function saveToLocalStorage() {

}