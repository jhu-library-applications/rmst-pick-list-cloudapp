import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '@exlibris/exl-cloudapp-angular-lib';
import { RequestedResource, RequestedResources } from '../interfaces/requested-resources.interface';
import { RequestedResourcesService } from '../services/requested_resources.service';
import { CloudAppEventsService } from '@exlibris/exl-cloudapp-angular-lib';
import { UserInfoService } from '../services/user_info.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  loading: boolean;
  noItemsMessage: string;
  today: number = Date.now();
  requestedResources: RequestedResources;
  rmstChecked: boolean = false;
  requesterChecked: boolean = false;
  currentlyAtLibCode: string;
  curentlyAtCircDeskCode: string;

  constructor(
    private alert: AlertService,
    private eventsService: CloudAppEventsService,
    private requestedResourcesService: RequestedResourcesService,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit() {
    this.requestedResourcesService.isLoading().subscribe(
      loading => this.loading = loading
    );

    this.eventsService.getInitData().subscribe(
      data => {
        this.requestedResourcesService.getRequestedResources(data.user.currentlyAtLibCode,
          data.user['currentlyAtCircDesk'], 100, this.alert).subscribe(
            result => {
              this.requestedResources = result

              this.requestedResources.requested_resource.forEach(resource => {
                this.addEmailToRequestedResource(resource);
              });
            }
          );
      }
    );
  }

  addEmailToRequestedResource(resource: RequestedResource) {
    resource.request.forEach(request => {
      if (request.requester.link) {
        this.userInfoService.getUserInfo(request.requester.link, this.alert).subscribe(result => {
          this.requestedResources.requested_resource.forEach(() => {
            request.email = result.contact_info.email
              .map(contact => contact.email_address)
              .join(', ');
          });
        });
      }
    });
  }

  getVisibleResources(): RequestedResource[] {
    return this.requestedResources.requested_resource.filter(resource =>
      resource.location.copy[0] && resource.location.copy[0].storage_location_id != '' || this.rmstChecked || this.requesterChecked
    );
  }

  getTotalVisible(): number {
    return this.getVisibleResources().length;
  }

  hideResource(index: number): void {
    const filteredAndSortedResources = this.getVisibleResources();
    if (filteredAndSortedResources[index]) {
      const resourceId = filteredAndSortedResources[index].location.holding_id.value;
      this.requestedResources.requested_resource = this.requestedResources.requested_resource.filter(resource => resource.location.holding_id.value !== resourceId);
    }
  }

  ngOnDestroy(): void {
  }
}