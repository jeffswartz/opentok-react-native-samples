//
//  FabricComponentRegistrar.cpp
//  BasicVideoTS
//
//  Created by Jaideep Shah on 4/7/25.
//

#include "FabricComponentRegistrar.h"

#import <React/RCTComponentViewFactory.h>
#import <React/RCTViewComponentView.h>
#import "OTRNPublisherComponentView.h"
#import "OTRNSubscriberComponentView.h"

@implementation FabricComponentRegistrar

+ (void)registerCustomComponents {
    RCTComponentViewFactory *factory = [RCTComponentViewFactory currentComponentViewFactory];
    [factory registerComponentViewClass:[OTRNPublisherComponentView class]];
    [factory registerComponentViewClass:[OTRNSubscriberComponentView class]];
}

@end
