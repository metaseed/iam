import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UpdateService } from "core";
import { environment } from "../environments/environment";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "I'm";
  constructor(
    private _http: HttpClient,
    private _updateService: UpdateService
  ) {
    if (environment.production) {
      this._updateService.checkForUpdate();
    }
  }
  ngOnInit() {}
  private markdown = "";
}
